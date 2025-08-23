import React from 'react'
import { Text, View } from 'react-native'

const Test = () => {
    return (
        <View>
            <Text>test</Text>
        </View>
    )
}

export default Test

/**
 * 
 * <Checkbox
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
 */

