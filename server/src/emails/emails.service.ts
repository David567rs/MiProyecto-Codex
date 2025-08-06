import { Injectable, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { VaccineMonth } from '../schemas/vaccineMonth.schema';
import { Vaccine } from '../schemas/vaccine.schema';
import { Children } from '../schemas/children.schema';
import { Campaigns } from '../schemas/campaigns.schema';
import { AgeControl } from '../schemas/agecontrol.schema';
import { Detection } from '../schemas/detection.schema';
import { AlarmSign } from '../schemas/alarmSign.schema';
import { Development } from '../schemas/development.schema'; 
import { DentalRecord } from '../schemas/dentalRecord.schema';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import PDFTable from 'pdfkit-table';
import { DevelopmentService } from '../development/development.service';

@Injectable()
export class EmailsService {
        private transporter: Transporter;
        private email: string = 'emailvacunas@gmail.com';
        private password: string = 'nlee bebk dsnh whke';
        private generatedCodes: Map<
                string,
                { code: string; timestamp: number }
        > = new Map();

        constructor(
                @InjectModel(User.name) private userModel: Model<User>,
                @InjectModel(VaccineMonth.name)
                private vaccineMonthModel: Model<VaccineMonth>,
                @InjectModel(Children.name)
                private childrenModel: Model<Children>,
                @InjectModel(Vaccine.name) private vaccineModel: Model<Vaccine>,
                @InjectModel(Campaigns.name)
                private CampaignsModel: Model<Campaigns>,
                @InjectModel(AgeControl.name)
                private ageControlModel: Model<AgeControl>,
                @InjectModel(Detection.name)
                private detectionModel: Model<Detection>,
                @InjectModel(AlarmSign.name)
                private alarmSignModel: Model<AlarmSign>,
                @InjectModel(Development.name)
                private developmentModel: Model<Development>,
                @InjectModel(DentalRecord.name)  
                private dentalRecordModel: Model<DentalRecord>,
                private readonly devService: DevelopmentService,
        ) {
                this.transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                                user: this.email,
                                pass: this.password,
                        },
                });
                setInterval(
                        () => {
                                this.clearExpiredCodes();
                        },
                        5 * 60 * 1000,
                );
        }

        private generateRandomCode(length: number): string {
                const characters = '0123456789';
                let result = '';
                const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                        result += characters.charAt(
                                Math.floor(Math.random() * charactersLength),
                        );
                }
                return result;
        }

        async sendRecoveryCode(to: string) {
                const user = await this.findOneByEmail(to);
                if (!user) {
                        throw new NotFoundException(
                                'El correo electrónico no está registrado.',
                        );
                }

                const code = this.generateRandomCode(4);
                const timestamp = Date.now();

                this.generatedCodes.set(to, { code, timestamp });

                const mailOptions = {
                        from: `"Sistema de vacunas" <${this.email}>`,
                        to,
                        subject: 'Recuperación de contraseña, El código expira en un máximo de 5 minutos',
                        text: `Tu código de recuperación es: ${code}`,
                        html: `<p>Tu código de recuperación es: <strong>${code}</strong></p>`,
                };

                try {
                        const info =
                                await this.transporter.sendMail(mailOptions);
                        console.log('Correo enviado: %s', info.messageId);
                        return { success: true };
                } catch (error) {
                        console.error('Error al enviar correo:', error);
                        throw error;
                }
        }

        private clearExpiredCodes() {
                const currentTime = Date.now();
                for (const [
                        email,
                        { timestamp },
                ] of this.generatedCodes.entries()) {
                        if (currentTime - timestamp > 5 * 60 * 1000) {
                                this.generatedCodes.delete(email);
      }
    }
  }

  async validateRecoveryCode(email: string, code: string): Promise<{ isValid: boolean, receivedEmail: string, receivedCode: string }> {
    const record = this.generatedCodes.get(email);
    const isValid = record && record.code === code;
    if (isValid) {
      this.generatedCodes.delete(email);
    }
    return { isValid, receivedEmail: email, receivedCode: code };
  }

  async sendVerificationEmail(to: string) {
    const user = await this.findOneByEmail(to);
    if (!user) {
      throw new NotFoundException('El correo electrónico no está registrado.');
    }

    const token = uuidv4();
    user.verificationToken = token;
    user.isVerified = false;
    await user.save();

    const verifyUrl = `http://localhost:3000/verify-email/${token}`;
    const mailOptions = {
      from: `"Sistema de vacunas" <${this.email}>`,
      to,
      subject: 'Verificación de correo electrónico',
      html: `<p>Por favor confirma tu correo haciendo clic en el siguiente enlace:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error('Error al enviar correo:', error);
      throw error;
    }
  }

  async verifyEmail(token: string): Promise<boolean> {
    const user = await this.userModel.findOne({ verificationToken: token });
    if (!user) {
      return false;
    }
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();
    return true;
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async sendNotificationEmail(parentEmail: string, observation: string = 'Sin observación') {
    const user = await this.findOneByEmail(parentEmail);
    if (!user) {
      throw new NotFoundException('El correo electrónico no está registrado.');
    }

    const children = await this.childrenModel.find({ parentId: user._id }).exec();
    if (!children || children.length === 0) {
      throw new NotFoundException('No se encontraron hijos para este usuario.');
    }

    const vaccineMonths = await this.vaccineMonthModel.find().lean().exec();
    const notifications = {};
    const upcomingVaccinations = {};
    const appliedVaccinations = {};
    const sendDate = new Date();

    for (const child of children) {
      const birthDate = this.parseDateOfBirth(child.dateOfBirth);
      const childFullName = `${child.name} ${child.lastName} ${child.secondLastName}`;
      // Asegúrate de que childVaccines sea un array
      const childVaccinesArray = Array.isArray(child.vaccines) ? child.vaccines : [child.vaccines];

      for (const vaccineMonth of vaccineMonths) {
        const expectedVaccineDate = this.calculateExpectedVaccineDate(birthDate, vaccineMonth.month);
        const currentDate = new Date();

        const missingVaccines = vaccineMonth.vaccines.filter(vaccineId => !childVaccinesArray.includes(vaccineId));
        const appliedVaccinesForMonth = childVaccinesArray.filter(vaccineId => vaccineMonth.vaccines.includes(vaccineId));

        if (missingVaccines.length > 0) {
          if (currentDate > expectedVaccineDate) {
              if (!notifications[childFullName]) {
              notifications[childFullName] = [];
            }
            notifications[childFullName].push(...missingVaccines.map(vaccineId => ({
              vaccineId,
              expectedVaccineDate,
              delayDays: this.calculateDaysDifference(expectedVaccineDate, currentDate)
            })));
          } else {
            if (!upcomingVaccinations[childFullName]) {
              upcomingVaccinations[childFullName] = [];
            }
            upcomingVaccinations[childFullName].push(...missingVaccines.map(vaccineId => ({
              vaccineId,
              expectedVaccineDate
            })));
          }
        }

        if (appliedVaccinesForMonth.length > 0) {
          if (!appliedVaccinations[childFullName]) {
            appliedVaccinations[childFullName] = [];
          }
          appliedVaccinations[childFullName].push(...appliedVaccinesForMonth.map(vaccineId => ({
            vaccineId,
            applicationDate: new Date() // Aquí puedes ajustar la fecha de aplicación si es necesario
          })));
        }
      }
    }

    for (const childName in notifications) {
      notifications[childName] = [...new Set(notifications[childName])];
    }

    for (const childName in upcomingVaccinations) {
      upcomingVaccinations[childName] = [...new Set(upcomingVaccinations[childName])];
    }

    for (const childName in appliedVaccinations) {
      appliedVaccinations[childName] = [...new Set(appliedVaccinations[childName])];
    }

    if (Object.keys(notifications).length === 0 && Object.keys(upcomingVaccinations).length === 0 && Object.keys(appliedVaccinations).length === 0) {
      console.log('No hay vacunas faltantes para notificar.');
      return { success: false, message: 'No hay vacunas faltantes para notificar.' };
    }

    const mailOptions = {
      from: `"Sistema de vacunas" <${this.email}>`,
      to: parentEmail,
      subject: 'Notificación de vacunas',
      html: await this.buildNotificationHtml(notifications, upcomingVaccinations, appliedVaccinations, observation, sendDate),
      attachments: [
        {
          filename: 'header.jpg',
          path: 'https://res.cloudinary.com/dwxlvv6lq/image/upload/v1718476935/zspdwq4pijyzp2bjrcyp.png',
          cid: 'headerImage'
        },
        {
          filename: 'footer.jpg',
          path: 'https://res.cloudinary.com/dwxlvv6lq/image/upload/v1718476928/n754w8dlsqmnaokwnylf.png',
          cid: 'footerImage'
        }
      ]
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado: %s', info.messageId);
      return { success: true };
    } catch (error) {
      console.error('Error al enviar correo:', error);
      throw error;
    }
  }



  private parseDateOfBirth(dateOfBirth: string): Date {
    const [day, month, year] = dateOfBirth.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  private calculateExpectedVaccineDate(birthDate: Date, months: number): Date {
    const expectedDate = new Date(birthDate);
    expectedDate.setMonth(expectedDate.getMonth() + months);
    return expectedDate;
  }

  private calculateDaysDifference(startDate: Date, endDate: Date): number {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private async buildNotificationHtml(
    notifications: any,
    upcomingVaccinations: any,
    appliedVaccinations: any,
    observation: string,
    sendDate: Date,
  ): Promise<string> {
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .header {
            text-align: center;
            background-color: #007BFF;
            padding: 20px;
          }
          .header img {
            width: 80%;
            height: auto;
          }
          .content {
            padding: 20px;
          }
          .footer {
            text-align: center;
            background-color: #f0f0f0;
            padding: 20px;
          }
          .footer img {
            width: 80%;
            height: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="cid:headerImage" alt="Header Image">
        </div>
        <div class="content">
          <h1>Notificación de vacunas</h1>
          <p>Fecha de envío: ${sendDate.toLocaleDateString('es-ES')}</p>
    `;

    for (const childName in notifications) {
      html += `
          <h2>Hijo: ${childName} (Vacunas Atrasadas)</h2>
          <table>
            <tr>
              <th>Vacuna</th>
              <th>Fecha esperada</th>
              <th>Días de retraso</th>
            </tr>
        `;

      for (const notification of notifications[childName]) {
        const vaccineId = notification.vaccineId;
        const expectedVaccineDate = notification.expectedVaccineDate.toLocaleDateString('es-ES');
        const delayDays = notification.delayDays;

        const vaccine = await this.vaccineModel.findById(vaccineId).lean().exec();
        const vaccineName = vaccine ? vaccine.name : 'Vacuna Desconocida';

        html += `
              <tr>
                <td>${vaccineName}</td>
                <td>${expectedVaccineDate}</td>
                <td>${delayDays}</td>
              </tr>
            `;
      }

      html += `</table>`;
    }

    if (Object.keys(upcomingVaccinations).length > 0) {
      for (const childName in upcomingVaccinations) {
        html += `
              <h2>Hijo: ${childName} (Vacunas próximas)</h2>
              <table>
                <tr>
                  <th>Vacuna</th>
                  <th>Fecha esperada</th>
                </tr>
            `;

        for (const vaccination of upcomingVaccinations[childName]) {
          const vaccineId = vaccination.vaccineId;
          const expectedVaccineDate = vaccination.expectedVaccineDate.toLocaleDateString('es-ES');

          const vaccine = await this.vaccineModel.findById(vaccineId).lean().exec();
          const vaccineName = vaccine ? vaccine.name : 'Vacuna Desconocida';

          html += `
                  <tr>
                    <td>${vaccineName}</td>
                    <td>${expectedVaccineDate}</td>
                  </tr>
                `;
        }

        html += `</table>`;
      }
    }

    if (Object.keys(appliedVaccinations).length > 0) {
      for (const childName in appliedVaccinations) {
        html += `
              <h2>Hijo: ${childName} (Vacunas Aplicadas)</h2>
              <table>
                <tr>
                  <th>Vacuna</th>
                  <th>Fecha de aplicación</th>
                </tr>
            `;

        for (const vaccination of appliedVaccinations[childName]) {
          const vaccineId = vaccination.vaccineId;
          const applicationDate = vaccination.applicationDate.toLocaleDateString('es-ES');

          const vaccine = await this.vaccineModel.findById(vaccineId).lean().exec();
          const vaccineName = vaccine ? vaccine.name : 'Vacuna Desconocida';

          html += `
                  <tr>
                    <td>${vaccineName}</td>
                    <td>${applicationDate}</td>
                  </tr>
                `;
        }

        html += `</table>`;
      }
    }

    if (observation) {
      html += `
            <h3>Observación:</h3>
            <p>${observation}</p>
        `;
    }

    html += `
        </div>
        <div class="footer">
          <img src="cid:footerImage" alt="Footer Image">
        </div>
      </body>
      </html>
    `;

    return html;
  }
  
  async sendNotificationCampaign(campaignId: string) {
    const campaign = await this.CampaignsModel.findById(campaignId).lean().exec();
    if (!campaign) {
      throw new NotFoundException('Campaña no encontrada');
    }

    const assignedNurseId = campaign.assignednurse;
    const users = await this.userModel.find({ assignedNurse: assignedNurseId }).exec();

    if (users.length === 0) {
      throw new NotFoundException('No se encontraron usuarios asignados a la enfermera');
    }

    for (const user of users) {
      const mailOptions = {
        from: `"Sistema de vacunas" <${this.email}>`,
        to: user.email,
        subject: `Notificación de campaña: ${campaign.name}`,
        html: this.buildCampaignNotificationHtml(campaign),
        attachments: [
          {
            filename: 'campaignHeader.jpg',
            path: campaign.images[0], // Assuming the first image is the header
            cid: 'campaignHeader'
          },
          {
            filename: 'campaignFooter.jpg',
            path: 'https://res.cloudinary.com/dwxlvv6lq/image/upload/v1718476928/n754w8dlsqmnaokwnylf.png',
            cid: 'campaignFooter'
          }
        ]
      };

      try {
        const info = await this.transporter.sendMail(mailOptions);
        console.log('Correo enviado: %s', info.messageId);
      } catch (error) {
        console.error('Error al enviar correo:', error);
      }
    }
  }
  //Enviar reporte por medio de sus correos a los padres 
  async sendHealthReportToParent(parentEmail: string, specifications?: string ) {
  // 1. Busca al padre (usuario tipo 'paciente')
  const parent = await this.userModel.findOne({
    email: parentEmail,
    typeUser: 'paciente',
  });
  if (!parent) {
    throw new NotFoundException('Padre no encontrado');
  }

  // 2. Busca hijos asociados
  const children = await this.childrenModel
    .find({ parentId: parent._id.toString() })
    .lean()
    .exec();
  if (!children.length) {
    throw new NotFoundException('No se encontraron hijos asociados');
  }

  // 3. Requiere el documento con tablas integrado (pdfkit-table)
  //    (ya no usamos registerPlugin)
  const PDFDocument = require('pdfkit-table');
  const doc = new PDFDocument();

  // 4. Captura los chunks de datos para armar el Buffer al final
  const buffers: Buffer[] = [];
  doc.on('data', (chunk) => buffers.push(chunk));

  // 5. Cabecera del PDF
  doc.fontSize(20).text('Reporte de Salud', { align: 'center' });
  doc
      .fontSize(12)
      .text(`Fecha de envío: ${new Date().toLocaleDateString('es-ES')}`, {
        align: 'center',
      });
  doc.moveDown();

  if (specifications) {
    doc
      .fontSize(12)
      .text('Especificaciones del doctor:', { underline: true });
    doc
      .fontSize(12)
      .text(specifications, { indent: 10, lineGap: 4 });
    doc.moveDown();
  }

  // 6. Por cada hijo, va agregando secciones
  for (const child of children) {
    // Nombre del niño
    doc.fontSize(16).text(`${child.name} ${child.lastName}`, { underline: true });
    doc.moveDown(0.5);

    const age = await this.ageControlModel
  .findOne({ childId: child._id })
  .lean()
  .exec();

if (age?.controls?.length) {
  // descarta controles que estén completamente vacíos
  const ageRows = age.controls
    .filter(c => c.age || c.weight || c.height || c.notes)
    .map(c => [
      c.age ?? '',
      c.weight ?? '',
      c.height ?? '',
      c.notes ?? '',
    ]);

  await doc.table(
    {
      title: { label: 'Control de Edad', fontSize: 14 },
      headers: ['Edad', 'Peso', 'Altura', 'Notas'],
      rows: ageRows,
    },
    {
      width: 500,
      startY: doc.y,
      padding: 5,
      columnSpacing: 5,
    }
  );

  doc.moveDown();
}

// Helper dentro de sendHealthReportToParent, al inicio del método
function ensureSpace(requiredHeight: number) {
  const bottomLimit = doc.page.height - doc.page.margins.bottom;
  if (doc.y + requiredHeight > bottomLimit) {
    doc.addPage();
  }
}

// 1) Helpers y datos
const dev = await this.devService.findByChild(child._id.toString());
const defaultAreas = ['Motor','Lenguaje','Social','Conocimiento'];

function parseAgeBlock(block: string) {
  const [numStr, unit] = block.trim().split(' ');
  return { value: Number(numStr), unit: unit.toLowerCase() };
}

// 2) Extrae sólo los registros de “meses”
const mesRecords = dev.records.filter(r =>
  parseAgeBlock(r.ageBlock).unit.startsWith('mes')
);

// 3) Saca y ordena la lista de bloques distintos (1 mes, 3 meses, 6 meses…)
const bloquesMeses = Array.from(new Set(
  mesRecords.map(r => r.ageBlock)
)).sort((a, b) =>
  parseAgeBlock(a).value - parseAgeBlock(b).value
);

// 4) Filtra solo los bloques que tengan al menos un hito “Sí”
const bloquesActivos = bloquesMeses.filter(bloque => {
  const registro = mesRecords.find(r => r.ageBlock === bloque);
  return registro?.milestones.some(m => m.value);
});

// 5) Para cada bloque activo, genera sus tablas de “Sí” y “No”
for (const bloque of bloquesActivos) {
  // 5.1) Filtrar registros de este bloque
  const registros = mesRecords.filter(r => r.ageBlock === bloque);

  // 5.2) Mapear a filas
  const filas = registros.flatMap(r =>
    r.milestones.map((m, i) => ({
      ageBlock: r.ageBlock,
      area:     m.area?.trim() ? m.area : defaultAreas[i] ?? '—',
      question: m.question,
      response: m.value ? 'Sí' : 'No',
    }))
  );

  // 5.3) Separar “Sí” y “No”
  const filasSi = filas.filter(f => f.response === 'Sí');
  const filasNo = filas.filter(f => f.response === 'No');

  // 5.4) Dibujar tabla de cumplidos
  if (filasSi.length) {
    ensureSpace(filasSi.length * 30 + 40);
    await doc.table(
      {
        title:   { label: `Cumplidos (${bloque})`, fontSize: 14 },
        headers: [
          { label: 'Bloque',    property: 'ageBlock', width:  80 },
          { label: 'Área',      property: 'area',     width: 100 },
          { label: 'Pregunta',  property: 'question', width: 260 },
          { label: 'Respuesta', property: 'response', width:  60 },
        ],
        datas: filasSi,
      },
      { width: 500, startY: doc.y, padding: 5, columnSpacing: 5 }
    );
    doc.moveDown(1);
  }

  // 5.5) Dibujar tabla de pendientes
  if (filasNo.length) {
    ensureSpace(filasNo.length * 30 + 40);
    await doc.table(
      {
        title:   { label: `Pendientes (${bloque})`, fontSize: 14 },
        headers: [
          { label: 'Bloque',    property: 'ageBlock', width:  80 },
          { label: 'Área',      property: 'area',     width: 100 },
          { label: 'Pregunta',  property: 'question', width: 260 },
          { label: 'Respuesta', property: 'response', width:  60 },
        ],
        datas: filasNo,
      },
      { width: 500, startY: doc.y, padding: 5, columnSpacing: 5 }
    );
    doc.moveDown(2);
  }
}

// === Detección temprana (tabla) ===
const det = await this.detectionModel
  .findOne({ childId: child._id })
  .lean()
  .exec();

if (det) {
  const detRows = det.responses.map((res) => [
    res.question,
    res.value ? 'Sí' : 'No',
  ]);

  if (detRows.length) {
    // Reserva espacio (aprox. 120px)
    ensureSpace(120);

    await doc.table(
      {
        title:   { label: 'Detección Temprana', fontSize: 14 },
        headers: [
          { label: 'Pregunta',  property: '0', width: 350 },
          { label: 'Respuesta', property: '1', width: 100 },
        ],
        rows: detRows,
      },
      {
        width: 500,
        startY: doc.y,
        padding: 5,
        columnSpacing: 5,
      },
    );
    doc.moveDown(2);
  }

  if (det.observations) {
    ensureSpace(50);
    doc.fontSize(12).text(`Observaciones: ${det.observations}`, { indent: 10 });
    doc.moveDown(2);
  }
}

const ALARM_SIGNS = [
  'Dificultad para respirar o respira muy rápido.',
  'Fiebre arriba de 38°C.',
  'Cordón umbilical rojo, con mal olor o secreción.',
  'Llanto débil o incontrolable.',
  'No come o succión débil.',
  'Fontanela hundida o abombada.',
  'No orina.',
];

// 2) Si por alguna razón quisieras usar child.earlyDetection.signsOfAlarm,
//    hazlo aquí; si no viene, usa la constante ALARM_SIGNS:
const rawSigns = Array.isArray(child.earlyDetection?.signsOfAlarm) && child.earlyDetection.signsOfAlarm.length
  ? child.earlyDetection.signsOfAlarm
  : ALARM_SIGNS;

// 3) Prepara las filas para pdfkit-table
const alarmSignsRows = rawSigns
  .filter(sign => !!sign)   // elimina entradas vacías
  .map(sign => [ sign ]);   // cada fila es un array de un solo elemento

// 4) Dibuja la tabla si hay al menos un signo
if (alarmSignsRows.length) {
  ensureSpace(100);  // ajusta el espacio si lo necesitas
  await doc.table(
    {
      title:   { label: 'Signos de Alarma', fontSize: 14 },
      headers: [{ label: 'Signo', property: '0', width: 500 }],
      rows:    alarmSignsRows,
    },
    {
      width:         500,
      startY:        doc.y,
      padding:       5,
      columnSpacing: 5,
    },
  );
  doc.moveDown(2);
}

// === Controles Dentales (ejecutar dentro del for de cada child) ===
const dentalRecords = await this.dentalRecordModel
  .find({ childId: child._id.toString() })
  .lean()
  .exec();

if (dentalRecords.length > 0) {
  ensureSpace(dentalRecords.length * 40 + 40);
  const dentalRows = dentalRecords.map(rec => [
    new Date(rec.date).toLocaleDateString('es-ES'),
    rec.visitType,
    rec.observation,
  ]);
  await doc.table(
    {
      title:   { label: 'Controles Dentales', fontSize: 14 },
      headers: ['Fecha', 'Medida', 'Observación'],
      rows:    dentalRows,
    },
    { width: 500, startY: doc.y, padding: 5, columnSpacing: 5 },
  );
  doc.moveDown(2);
}


// === Recomendación de cita ===
/*const needsAppointment =
  age?.controls?.some((c) => c.medicalCheck) ||
  det?.suspect ||
  Boolean(alarm?.diagnosis?.trim());

ensureSpace(50);
doc
  .fontSize(12)
  .text(
    needsAppointment
      ? 'Se recomienda agendar una cita médica.'
      : 'No requiere cita médica por ahora.',
  );

    doc.moveDown(2);
// Página nueva para el siguiente hijo
    doc.addPage();

  }*/

  // 7. Termina el PDF y arma el Buffer final
  const pdfBuffer: Buffer = await new Promise((resolve, reject) => {
    doc.end();
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);
  });

  // 8. Envía el correo con el PDF adjunto
  const mailOptions = {
    from: `"Sistema de vacunas" <${this.email}>`,
    to: parentEmail,
    subject: 'Reporte de salud de sus hijos',
    text: 'Adjunto encontrará el reporte de salud',
    attachments: [{ filename: 'reporte_salud.pdf', content: pdfBuffer }],
  };

  try {
    const info = await this.transporter.sendMail(mailOptions);
    console.log('Correo enviado: %s', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar correo:', error);
    throw error;
  }
}


  }

  private buildCampaignNotificationHtml(campaign: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .header {
            text-align: center;
            background-color: #007BFF;
            padding: 20px;
          }
          .header img {
            width: 80%;
            height: auto;
          }
          .content {
            padding: 20px;
          }
          .footer {
            text-align: center;
            background-color: #f0f0f0;
            padding: 20px;
          }
          .footer img {
            width: 80%;
            height: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="cid:campaignHeader" alt="Header Image">
        </div>
        <div class="content">
          <h1>${campaign.name}</h1>
          <p>${campaign.description}</p>
          <table>
            <tr>
              <th>Fecha de inicio</th>
              <td>${new Date(campaign.startdate[0]).toLocaleDateString('es-ES')}</td>
            </tr>
            <tr>
              <th>Fecha de finalización</th>
              <td>${new Date(campaign.finaldate[0]).toLocaleDateString('es-ES')}</td>
            </tr>
            <tr>
              <th>Horario</th>
              <td>${campaign.hour[0]}</td>
            </tr>
            <tr>
              <th>Estado</th>
              <td>${campaign.state[0]}</td>
            </tr>
            <tr>
              <th>Ciudad</th>
              <td>${campaign.city[0]}</td>
            </tr>
            <tr>
              <th>Colonia</th>
              <td>${campaign.colony[0]}</td>
            </tr>
            <tr>
              <th>Vacunas</th>
              <td>${campaign.vaccines.join(', ')}</td>
            </tr>
            <tr>
              <th>Efectos secundarios</th>
              <td>${campaign.sideeffects.join(', ')}</td>
            </tr>
            <tr>
              <th>Edad</th>
              <td>${campaign.age.join(', ')}</td>
            </tr>
          </table>
        </div>
        <div class="footer">
          <img src="cid:campaignFooter" alt="Footer Image">
        </div>
      </body>
      </html>
    `;
  }


}