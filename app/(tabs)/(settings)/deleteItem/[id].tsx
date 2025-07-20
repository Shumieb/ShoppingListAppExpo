import useListItemStore from '@/stores/listItemStore';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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

const DeleteItem = () => {

    const { id } = useLocalSearchParams();
    const router = useRouter();

    const getItemById = useListItemStore((state) => state.getItemById)
    const removeItem = useListItemStore((state) => state.removeItem)

    const [item, setItem] = useState<ItemType | undefined>(undefined);

    useEffect(() => {
        if (id != null) {
            // set item
            let newItem = getItemById(id);
            if (newItem) {
                setItem(newItem);
            }
        }
    }, [id])

    const deleteItem = () => {

        removeItem(item?.id);

        if (item?.listId) {
            router.replace({ pathname: "/details/[id]", params: { id: item.listId } });
        }
    }

    const cancelDelete = () => {
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
                <Text style={styles.title}>Delete Item</Text>
                <View style={styles.titleContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            Are you sure you want to delete the following item:
                        </Text>
                        <Text style={[styles.text, styles.textItem]}>
                            {item?.name}
                        </Text>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={[styles.btn, styles.btnEdit]}
                        onPress={deleteItem}
                    >
                        <AntDesign name="checkcircle" size={18} color="#E9DCC9" />
                        <Text style={styles.cardText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, styles.btnCancel]}
                        onPress={cancelDelete}
                    >
                        <MaterialIcons name="cancel" size={22} color="#E9DCC9" />
                        <Text style={styles.cardText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DeleteItem

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
        elevation: 3,
    },
    textContainer: {
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
        marginBottom: 10,
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
})