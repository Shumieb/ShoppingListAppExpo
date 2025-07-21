import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface PropTypes {
    setModalVisible: (visible: boolean) => void
}

const ClearListBtn = ({
    setModalVisible
}: PropTypes) => {
    return (
        <>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => setModalVisible(true)}
            >
                <MaterialIcons name="delete" size={22} color="#0A3A40" />
                <Text style={styles.btnText}>Clear Shopping List</Text>
            </TouchableOpacity>
        </>

    )
}

export default ClearListBtn

const styles = StyleSheet.create({
    btn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f86363ff",
        paddingHorizontal: 2,
        paddingVertical: 6,
        borderRadius: 4,
        fontWeight: "bold",
        width: "70%",
        borderColor: "#f86363ff",
        borderWidth: 2
    },
    btnText: {
        color: "#0A3A40",
        fontSize: 16,
        fontWeight: "bold",
        paddingLeft: 8,
    },
})