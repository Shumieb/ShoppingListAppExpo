import FormTextInput from '@/components/FormTextInput';
import useListItemStore from '@/stores/listItemStore';
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ItemType {
    id: string,
    name: string,
    listId: string,
    completed: boolean
};

const ItemSettings = () => {

    const { id } = useLocalSearchParams();
    const router = useRouter();

    const getItemById = useListItemStore((state) => state.getItemById);
    const updateItem = useListItemStore((state) => state.updateItem);

    const [item, setItem] = useState<ItemType | undefined>(undefined);
    const [newName, setNewName] = useState<string>("");
    const [formPlaceHolder, setFormPlaceHolder] = useState<string>("new item name");

    useEffect(() => {
        if (id != null) {
            // set item
            let newItem = getItemById(id);
            if (newItem) {
                setItem(newItem);
                setNewName(newItem.name);
            }
        }
    }, [id])

    const editItem = () => {
        if (!item) return;

        const updatedItem: ItemType = {
            id: item.id,
            name: newName,
            listId: item.listId,
            completed: item.completed,
        };

        updateItem(updatedItem);
        setItem(updatedItem);

        if (item?.listId) {
            router.replace({ pathname: "/details/[id]", params: { id: item.listId } });
        }
    }

    // If no id is provided, show a no selected item component
    if (id == null) {
        return router.replace({ pathname: "/shoppingLists" });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Edit Item</Text>
                <View style={styles.titleContainer}>
                    <View style={styles.formInputContainer}>
                        <FormTextInput
                            onChangeHandler={setNewName}
                            inputValue={newName}
                            formPlaceHolder={formPlaceHolder}
                        />
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={[styles.btn, styles.btnEdit]}
                        onPress={editItem}
                    >
                        <Feather name="edit" size={22} color="#E9DCC9" />
                        <Text style={styles.cardText}>Edit Item</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ItemSettings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 12,
        backgroundColor: "#0A3A40",
        width: "100%",
    },
    formContainer: {
        backgroundColor: "#428188ff",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 10,
        width: "100%",
    },
    formInputContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        paddingVertical: 10,
    },
    title: {
        color: "#E9DCC9",
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },
    cardText: {
        fontSize: 17,
        color: "#E9DCC9",
        paddingHorizontal: 4,
        fontWeight: "bold",
    },
    btnContainer: {
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
        elevation: 2,
        width: "100%",
    },
    btnEdit: {
        backgroundColor: "#0a3a40",
        width: "80%",
    },
})