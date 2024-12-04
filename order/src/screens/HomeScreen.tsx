import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Alert } from 'react-native';

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const [search, setSearch] = useState('');
    const [menuItems, setMenuItems] = useState([
        { id: '1', name: 'Pizza', price: '$10', image: 'https://via.placeholder.com/100' },
        { id: '2', name: 'Burger', price: '$8', image: 'https://via.placeholder.com/100' },
        { id: '3', name: 'Pasta', price: '$12', image: 'https://via.placeholder.com/100' },
    ]);

    const handleAddToCart = (item: { name: string }) => {
        Alert.alert('Added to Cart', `${item.name} has been added to your cart.`);
    };

    const renderMenuItem = ({ item }: { item: { id: string, name: string, price: string, image: string } }) => (
        <View style={styles.menuItem}>
            <Image source={{ uri: item.image }} style={styles.menuImage} />
            <View style={styles.menuDetails}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuPrice}>{item.price}</Text>
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => handleAddToCart(item)}
                >
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Our Restaurant</Text>
            <TextInput
                style={styles.searchBox}
                placeholder="Search for dishes..."
                value={search}
                onChangeText={(text) => setSearch(text)}
            />
            <FlatList
                data={menuItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))}
                renderItem={renderMenuItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.menuList}
            />
            <View style={styles.navigation}>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Text>Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                    <Text>Orders</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
    },
    searchBox: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    menuList: {
        paddingBottom: 16,
    },
    menuItem: {
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    menuImage: {
        width: 60,
        height: 60,
        marginRight: 12,
        borderRadius: 8,
    },
    menuDetails: {
        flex: 1,
    },
    menuName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    menuPrice: {
        color: '#888',
        marginVertical: 4,
    },
    addToCartButton: {
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
});

export default HomeScreen;