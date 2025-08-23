import useListItemStore from '@/stores/listItemStore';
import { ItemType } from '@/util/entityTypes';
import { Feather, Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { SQLiteDatabase } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PropTypes {
    item: ItemType;
    setEditModalVisible: (visible: boolean) => void;
    setDeleteModalVisible: (visible: boolean) => void;
    setItemToEdit: (item: ItemType) => void;
    setItemToDelete: (item: ItemType) => void;
    db: SQLiteDatabase
}

const ListItemCard = ({
    item,
    setEditModalVisible,
    setItemToEdit,
    setDeleteModalVisible,
    setItemToDelete,
    db
}: PropTypes) => {

    const toggleItemCompleted = useListItemStore((state) => state.toggleItemCompleted)

    const [isChecked, setIsChecked] = useState<Boolean>(false);

    useEffect(() => {
        setIsChecked(item.completed ? true : false)
    }, [item])

    const setChecked = () => {
        // update local state
        setIsChecked(!isChecked);
        // update database and global state
        toggleItemCompleted(db, item.id, item);
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
                    value={isChecked ? true : false}
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
                    <Feather name="edit" size={22} color={isChecked ? "#3d3737ff" : "#c1dde0ff"} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleDeleteItem}
                >
                    <Ionicons name="trash" size={22} color={isChecked ? "#3d3737ff" : "#8C1F28"} />
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
        color: "#cbc5c5ff",
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