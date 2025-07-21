import Entypo from '@expo/vector-icons/Entypo';
import { StyleSheet, Text, View } from 'react-native';

interface PropTypes {
    ListType: string,
    buttonText: string,
}

const EmptyListComponent = ({ ListType, buttonText }: PropTypes) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconTop}>
                <Entypo name="grid" size={24} color="#E9DCC9" />
            </View>

            <Text style={styles.text}>You do not have any </Text>
            <Text style={[styles.text, { paddingBottom: 12 }]}>{ListType}.</Text>
            <Text style={styles.textSmall}>Click the "{buttonText}" button to add your first list.</Text>

            <View style={styles.iconBottom}>
                <Entypo name="grid" size={24} color="#E9DCC9" />
            </View>
        </View>
    )
}

export default EmptyListComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    text: {
        fontSize: 20,
        color: "#E9DCC9",
        paddingHorizontal: 4,
        fontWeight: "bold",
        textAlign: "center"
    },
    textSmall: {
        fontSize: 18,
        color: "#E9DCC9",
        paddingHorizontal: 4,
        fontWeight: "bold",
        textAlign: "center",
        fontStyle: "italic",
        letterSpacing: 1
    },
    iconTop: {
        marginBottom: 30
    },
    iconBottom: {
        marginTop: 30
    }
})