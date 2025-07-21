import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PropTypes {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    clearList: (id: string) => void
    modalTitle: string
    listToDeleteId: string
    listName: string | undefined
}

const ClearListModal = ({
    modalVisible,
    setModalVisible,
    modalTitle,
    clearList,
    listToDeleteId,
    listName
}: PropTypes) => {

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
                    <Text style={styles.title}>{modalTitle}</Text>
                    <View style={styles.titleContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>
                                Are you sure you want to clear all
                                the items in the following Shopping list:
                            </Text>
                            <Text style={[styles.text, styles.textItem]}>
                                {listName ? listName : "Shopping List"}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={[styles.btn, styles.btnEdit]}
                            onPress={() => listToDeleteId && clearList(listToDeleteId)}
                        >
                            <AntDesign name="checkcircle" size={18} color="#E9DCC9" />
                            <Text style={styles.cardText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btn, styles.btnCancel]}
                            onPress={() => setModalVisible(false)}
                        >
                            <MaterialIcons name="cancel" size={22} color="#E9DCC9" />
                            <Text style={styles.cardText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ClearListModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        marginHorizontal: 20,
        width: "90%",
        backgroundColor: '#428188ff',
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
    title: {
        color: "#E9DCC9",
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    titleContainer: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        paddingVertical: 10,
    },
    textContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#0A3A40",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: 4,
    },
    textItem: {
        color: "#E9DCC9",
        fontSize: 20
    },
    cardText: {
        fontSize: 17,
        color: "#E9DCC9",
        paddingHorizontal: 4,
        fontWeight: "bold",
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 2,
        marginBottom: 22,
        marginTop: 18,
    },
    btn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 18,
        paddingHorizontal: 2,
        paddingVertical: 18,
        marginVertical: 4,
        marginHorizontal: 4,
        borderRadius: 4,
        elevation: 3,
    },
    btnEdit: {
        backgroundColor: "#0a3a40",
        width: "45%",
    },
    btnCancel: {
        backgroundColor: "#9e3312ff",
        width: "45%",
    },
});