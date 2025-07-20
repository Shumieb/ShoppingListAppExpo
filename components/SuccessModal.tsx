import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface modalComponentProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    modalText: string;
}

const SuccessModal = ({ modalVisible, setModalVisible, modalText }: modalComponentProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{modalText}</Text>
                    <Pressable
                        style={[styles.button, styles.btnClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>OK</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default SuccessModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#E9DCC9',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        color: "#0A3A40",
        fontSize: 18,
        fontWeight: "bold",
    },
    button: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        elevation: 2,
    },
    btnClose: {
        backgroundColor: '#0A3A40',
    },
    textStyle: {
        color: '#E9DCC9',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});