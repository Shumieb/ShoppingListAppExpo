import EditNameModal from '@/components/EditNameModal';
import FeedBackModal from '@/components/FeedBackTextModal';
import NoSelectedListComponent from '@/components/NoSelectedListComponent';
import useListItemStore from '@/stores/listItemStore';
import useShoppingListStore from '@/stores/shoppingListsStore';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ListDetails = () => {

    const { id } = useLocalSearchParams();
    const router = useRouter();

    const getShoppingListById = useShoppingListStore((state) => state.getShoppingListById)
    const updateShoppingList = useShoppingListStore((state) => state.updateShoppingList)
    const removeShoppingList = useShoppingListStore((state) => state.removeShoppingList)

    const getItemCountByListId = useListItemStore((state) => state.getItemCountByListId)

    const [title, setTitle] = useState<string | undefined>("Default");
    const [itemCount, setItemCount] = useState<number>(0);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [unsuccessfulDelete, setUnsuccessfulDelete] = useState(false);

    useEffect(() => {
        if (id != null) {
            // set the page title
            let newTitle = getShoppingListById(id);
            if (newTitle?.name) setTitle(newTitle?.name);

            // set the item count
            let count = getItemCountByListId(id);
            if (count != null) setItemCount(count);
        }
    }, [])

    const showShoppingListDetails = () => {
        const validId = Array.isArray(id) ? id[0] : id;
        router.replace({ pathname: "/details/[id]", params: { id: validId } })
    }

    const editListName = (newName: string) => {
        let updatedShoppingList = {
            id: id as string,
            name: newName,
        }
        updateShoppingList(updatedShoppingList);
        setTitle(newName);
        setEditModalVisible(!editModalVisible);
    }

    const deleteList = () => {
        if (id == null) return;
        if (itemCount <= 0) {
            removeShoppingList(id as string);
            router.replace("/shoppingLists");
        } else {
            setUnsuccessfulDelete(!unsuccessfulDelete);
        }
    }

    // If no id is provided, show a no selected list component
    if (id == null) {
        return <NoSelectedListComponent />
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headers}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.title}>Settings</Text>
            </View>
            <View style={styles.listViewContainer}>
                <Text
                    style={styles.cardViewText}
                >
                    Number of Items in the list: {itemCount}
                </Text>
                <TouchableOpacity
                    style={[styles.btn, styles.btnViewItems]}
                    onPress={showShoppingListDetails}
                >
                    <Ionicons name="eye-outline" size={22} color="#E9DCC9" />
                    <Text style={styles.cardText}>View List Items</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={[styles.btn, styles.btnEdit]}
                    onPress={() => setEditModalVisible(true)}
                >
                    <Feather name="edit" size={22} color="#E9DCC9" />
                    <Text style={styles.cardText}>Edit Name</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, styles.btnDelete]}
                    onPress={deleteList}
                >
                    <Ionicons name="trash" size={22} color="#E9DCC9" />
                    <Text style={styles.cardText}>Delete List</Text>
                </TouchableOpacity>
            </View>

            {/* Edit list modal */}
            <EditNameModal
                modalVisible={editModalVisible}
                editName={editListName}
                setModalVisible={setEditModalVisible}
                currentNameId={id as string}
                modalType="list"
                modalTitle="Edit List Name"
            />

            {/* Delete unsuccessful modal */}
            <FeedBackModal
                modalVisible={unsuccessfulDelete}
                setModalVisible={setUnsuccessfulDelete}
                modalText="You cannot delete a list with items in it. Please remove all items before deleting the list."
            />
        </SafeAreaView>
    )
}

export default ListDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 12,
        backgroundColor: "#0A3A40",
    },
    headers: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    title: {
        color: "#E9DCC9",
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold"
    },
    cardViewText: {
        color: "#E9DCC9",
        fontSize: 18,
        paddingVertical: 10,
        textAlign: "center",
        fontWeight: "bold",
    },
    cardText: {
        fontSize: 16,
        color: "#E9DCC9",
        paddingHorizontal: 8,
        fontWeight: "bold",
    },
    listViewContainer: {
        width: "100%",
        paddingHorizontal: 6,
        paddingVertical: 10,
        backgroundColor: "#428188ff",
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 2,
        marginBottom: 18
    },
    btn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 18,
        paddingHorizontal: 8,
        paddingVertical: 12,
        marginVertical: 8,
        marginHorizontal: 4,
        borderRadius: 4,
    },
    btnViewItems: {
        backgroundColor: "#0A3A40",
        width: "80%",
    },
    btnEdit: {
        backgroundColor: "#428188ff",
        width: "45%",
    },
    btnDelete: {
        backgroundColor: "#d21b0eff",
        width: "45%",
    },
})