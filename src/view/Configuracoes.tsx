import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import useAuthControl from "../control/AuthController"
import { useAuth } from "../context/AuthContext"

const Configuracoes = () => {
    const { logout } = useAuth()
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    button: {
        backgroundColor: '#dc3545',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Configuracoes;

