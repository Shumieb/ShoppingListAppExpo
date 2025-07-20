import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CardProps {
    title: string,
    id: string
}

const ListCard = ({ title, id }: CardProps) => {

    const router = useRouter();

    const showShoppingListDetails = () => {
        router.replace({ pathname: "/details/[id]", params: { id } })
    }

    const showShoppingListSettings = () => {
        router.replace({ pathname: "/listSettings/[id]", params: { id } })
    }

    return (
        <View style={styles.card}>
            <TouchableOpacity
                onPress={showShoppingListDetails}
                style={styles.cardTextContainer}
            >
                <Text style={styles.cardTitle}>{title}</Text>
            </TouchableOpacity>
            <View style={styles.settingsBtnContainer}>
                <TouchableOpacity
                    onPress={showShoppingListSettings}
                    style={styles.settingsBtn}
                >
                    <Ionicons name="settings" size={22} color="#0A3A40" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ListCard

const styles = StyleSheet.create({
    card: {
        marginBottom: 15,
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        backgroundColor: "#428188ff",
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 4,
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    cardTitle: {
        color: "#E9DCC9",
        fontSize: 18,
        fontWeight: "bold",
    },
    cardTextContainer: {
        width: "80%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingRight: 10,
    },
    settingsBtnContainer: {
        width: "20%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    settingsBtn: {
        padding: 8,
        height: "100%",
        width: "100%",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "flex-end",
    }
})