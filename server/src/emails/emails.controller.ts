import { Controller, Post, Body, HttpException, HttpStatus, Get, Param,Res } from '@nestjs/common';
import { Response } from 'express';
import { EmailsService } from './emails.service';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) { }

  @Post('send-recovery-code')
  async sendRecoveryCode(@Body('email') email: string) {
    try {
      return await this.emailsService.sendRecoveryCode(email);
    } catch (error) {
      throw new HttpException('Error al enviar el correo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('validate-code')
  async validateRecoveryCode(@Body() body: { email: string, code: string }) {
    const result = await this.emailsService.validateRecoveryCode(body.email, body.code);
    if (result.isValid) {
      return { success: true, email: result.receivedEmail, code: result.receivedCode };
    } else {
      return { success: false, email: result.receivedEmail, code: result.receivedCode };
    }
  }

  @Post('send-verification-email')
  async sendVerification(@Body('email') email: string) {
    try {
      return await this.emailsService.sendVerificationEmail(email);
    } catch (error) {
      throw new HttpException('Error al enviar el correo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('verify/:token')
  async verify(@Param('token') token: string, @Res() res: Response) {
    const ok = await this.emailsService.verifyEmail(token);
    if (ok) {
      return res.status(200).send('Correo verificado');
    }
    return res.status(400).send('Token inválido');
  }

  @Post('send-notification-email')
  async sendNotificationEmail(
    @Body('parentEmail') parentEmail: string,
    @Body('observation') observation: string,
  ) {
    try {
      return await this.emailsService.sendNotificationEmail(parentEmail, observation);
    } catch (error) {
      throw new HttpException('Error al enviar la notificación de vacunas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('sendNotification')
  async sendNotification(@Body('campaignId') campaignId: string) {
    return this.emailsService.sendNotificationCampaign(campaignId);
  }
}
