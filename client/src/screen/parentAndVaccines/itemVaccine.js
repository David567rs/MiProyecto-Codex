import { Button, Icon, Image } from "@rneui/themed";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { NoImgVaccineIcon } from "../../icons/iconsSvg";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get('window');

const ItemVaccine = ({ m, children, deleteMonth = null }) => {
    const { navigate } = useNavigation();

    const handlePress = () => {
        const childName = children.length > 0 ? children[0].name : '';
        navigate('vaccinelistChildren', { children, month: m, childName });
    };

    return (
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={.9} onPress={handlePress}>
            <View
                style={{
                    position: 'relative',
                    flex: 1,
                    borderRadius: 10,
                    height: 220,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    maxWidth: width / 2 - 20,
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
                    elevation: 4,
                    backgroundColor: '#FFFFFF',
                    margin: 10,
                    marginBottom: 40,
                    zIndex: 10
                }}>
                {m?.image !== "" ? (
                    <Image
                        source={{ uri: m?.image }}
                        resizeMode='contain'
                        style={{ width: width / 2 - 30, borderTopLeftRadius: 10, borderTopRightRadius: 10, aspectRatio: 1 / 1, objectFit: 'contain' }} />
                ) : (
                    <View style={{ width: width / 2 - 20, alignItems: 'center', justifyContent: 'center' }}>
                        <NoImgVaccineIcon size={60} />
                    </View>
                )}
                <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 10 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', gap: 10 }}>
                            <Text style={{ textAlign: 'left', fontSize: 18 }}>Mes:</Text>
                            <Text style={{ textAlign: 'left', fontSize: 18, color: '#48A2E2', fontWeight: 'bold' }}>{m?.month}</Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', gap: 10 }}>
                            <Text style={{ textAlign: 'left', fontSize: 18 }}>Vacunas:</Text>
                            <Text style={{ textAlign: 'left', fontSize: 18, color: '#48A2E2', fontWeight: 'bold' }}>{m?.vaccines.length}</Text>
                        </View>
                    </View>
                    {deleteMonth != null && (
                        <View style={{ width: 40, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../../assets/icons/icons8-de-acuerdo-96.png')} style={{ width: 30, height: 30 }} />
                        </View>
                    )}
                </View>
                {deleteMonth != null && (
                    <View style={{ width: '100%', flexDirection: 'row', position: 'absolute', bottom: -35, left: 0, zIndex: 5, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }}>
                         <TouchableOpacity
                              activeOpacity={0.7}
                              style={{
                                  paddingTop: 30,
                                  width: '50%',
                                  alignSelf: 'center',
                                  alignItems: 'center',
                                  backgroundColor: 'red',
                                  borderBottomLeftRadius: 10,
                              }}
                              onPress={() => deleteMonth(m._id.toString())}
                          >
                              <Icon type='antdesign' name='delete' size={20} color='#FFFFFF' />
                          </TouchableOpacity>
                          <TouchableOpacity
                              activeOpacity={0.7}
                              style={{
                                  marginTop: 30,
                                  width: '50%',
                                  alignItems: 'center',
                                  backgroundColor: '#48A2E2',
                                  borderBottomRightRadius: 10,
                              }}
                          >
                              <Icon type='antdesign' name='edit' size={20} color='#FFFFFF' />
                          </TouchableOpacity>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default ItemVaccine;
