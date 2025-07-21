import useListItemStore from '@/stores/listItemStore';
import useShoppingListStore from '@/stores/shoppingListsStore';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FormTextInput from './FormTextInput';

interface modalComponentProps {
    modalVisible: boolean;
    editName: (name: string) => void;
    setModalVisible: (visible: boolean) => void;
    currentNameId?: string;
    modalType: "list" | "item";
    modalTitle: string;
}

const EditNameModal = ({
    modalVisible,
    editName,
    setModalVisible,
    currentNameId = "",
    modalType,
    modalTitle,
}: modalComponentProps) => {

    const getShoppingListById = useShoppingListStore((state) => state.getShoppingListById)

    const getItemById = useListItemStore((state) => state.getItemById)

    const [newName, setNewName] = useState("");

    useEffect(() => {
        let title;
        if (currentNameId) {
            if (modalType === "item") {
                title = getItemById(currentNameId);
            } else if (modalType === "list") {
                title = getShoppingListById(currentNameId);
            }

            if (title?.name) {
                setNewName(title?.name);
            }
        }
    }, [currentNameId, modalType]);

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
                    <Text style={styles.modalText}>{modalTitle}</Text>
                    <View style={styles.formInputContainer}>
                        <FormTextInput
                            onChangeHandler={setNewName}
                            inputValue={newName}
                            formPlaceHolder="New list name"
                            bgColor="#0A3A40"
                            textColor="#E9DCC9"
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={[styles.btn, styles.btnSubmit]}
                            onPress={() => editName(newName)}
                        >
                            <Feather name="edit" size={18} color="#E9DCC9" />
                            <Text style={styles.textStyle}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btn, styles.btnClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <AntDesign name="closecircle" size={18} color="#E9DCC9" />
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default EditNameModal

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
    modalText: {
        marginBottom: 30,
        textAlign: 'center',
        color: "#E9DCC9",
        fontSize: 18,
        fontWeight: "bold",
    },
    btn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 10,
        elevation: 2,
        width: "48%",
        marginHorizontal: 8,
    },
    btnClose: {
        backgroundColor: '#9e3312ff',
    },
    btnSubmit: {
        backgroundColor: '#0A3A40',
    },
    textStyle: {
        color: '#E9DCC9',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        paddingLeft: 4,
    },
    formInputContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#428188ff",
        marginHorizontal: "auto",
        marginBottom: 10,
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        paddingHorizontal: 6,
        paddingVertical: 10,
        marginTop: 10,
    },
});