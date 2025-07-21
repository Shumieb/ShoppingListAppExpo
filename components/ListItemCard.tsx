import useListItemStore from '@/stores/listItemStore'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'
import Checkbox from 'expo-checkbox'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface ItemType {
    id: string,
    name: string,
    listId: string,
    completed: boolean
};

interface CardProps {
    item: ItemType;
    setEditModalVisible: (visible: boolean) => void;
    setDeleteModalVisible: (visible: boolean) => void;
    setItemToEdit: (item: ItemType) => void;
    setItemToDelete: (item: ItemType) => void;
}

const ListItemCard = ({
    item,
    setEditModalVisible,
    setItemToEdit,
    setDeleteModalVisible,
    setItemToDelete
}: CardProps) => {

    const toggleItemCompleted = useListItemStore((state) => state.toggleItemCompleted)

    const [isChecked, setIsChecked] = useState(item.completed);

    const setChecked = () => {
        setIsChecked(!isChecked);
        toggleItemCompleted(item.id);
    }

    const handleEditItem = () => {
        setItemToEdit(item)
        setEditModalVisible(true)
    }

    const handleDeleteItem = () => {
        setItemToDelete(item)
        setDeleteModalVisible(true)
    };

    return (
        <View style={styles.card}>
            <View style={styles.titles}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    color={isChecked ? "#3d3737ff" : "#E9DCC9"}
                    onValueChange={setChecked}
                />
                <Text
                    style={[styles.cardTitle, isChecked ? styles.cardCompleted : null]}
                >
                    {item.name}
                </Text>
            </View>
            <View style={styles.cardBtns}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleEditItem}
                >
                    <Feather name="edit" size={22} color="#c1dde0ff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleDeleteItem}
                >
                    <Ionicons name="trash" size={22} color="#f86363ff" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ListItemCard

const styles = StyleSheet.create({
    card: {
        marginBottom: 15,
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        backgroundColor: "#428188ff",
        paddingVertical: 8,
        paddingHorizontal: 6,
        borderRadius: 4,
        marginLeft: 12,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    cardTitle: {
        color: "#E9DCC9",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 4
    },
    cardCompleted: {
        color: "#3d3737ff",
        fontStyle: "italic"
    },
    cardBtns: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    titles: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    btn: {
        marginHorizontal: 3,
    },
    checkbox: {
        margin: 8,
    }
})