import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  saveSupplier,
  getSuppliers,
  clearSuppliers,
  deleteSupplier,
  editSupplier
} from "../features/storage";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    categories: ""
  });
  const [suppliers, setSuppliers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const testFunction = async () => {
    console.log(suppliers);
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.address ||
      !formData.contact ||
      !formData.categories
    ) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    if (editingIndex !== null) {
      await editSupplier(formData);
      await loadSuppliers();
      setEditingIndex(null);
      Alert.alert("Sucesso", "Fornecedor atualizado com sucesso!");
    } else {
      // Adicionar novo fornecedor
      await saveSupplier(formData);
      const data = await getSuppliers();
      setSuppliers(data);
      Alert.alert("Sucesso", "Fornecedor adicionado com sucesso!");
    }

    setFormData({
      name: "",
      address: "",
      contact: "",
      categories: ""
    });
  };

  const loadSuppliers = async () => {
    const data = await getSuppliers();
    setSuppliers(data);
  };

  const handleEdit = (index) => {
    // Preencher o formulário com os dados do fornecedor para edição
    setFormData(suppliers[index]);
    setEditingIndex(index);
  };

  const handleRemoveSupplier = async (index) => {
    await deleteSupplier(suppliers[index].id);
    await loadSuppliers();
    Alert.alert("Sucesso", "Fornecedor removido com sucesso!");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filtra por localização (endereço) ou categoria
    const filtered = suppliers.filter(
      (supplier) =>
        supplier.address.toLowerCase().includes(query.toLowerCase()) ||
        supplier.categories.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredSuppliers(filtered);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title} onPress={testFunction}>
        {editingIndex !== null ? "Editar Fornecedor" : "Adicionar Fornecedor"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={formData.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={formData.address}
        onChangeText={(text) => handleInputChange("address", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contato"
        value={formData.contact}
        onChangeText={(text) => handleInputChange("contact", text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Categorias de Produtos (separadas por vírgula)"
        value={formData.categories}
        onChangeText={(text) => handleInputChange("categories", text)}
      />

      <Button
        title={
          editingIndex !== null ? "Salvar Alterações" : "Adicionar Fornecedor"
        }
        onPress={handleSubmit}
      />

      {/* Campo de Pesquisa */}
      <Text style={styles.listTitle}>Pesquisar Fornecedores</Text>
      <TextInput
        style={styles.input}
        placeholder="Pesquise por localização ou categoria"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <ScrollView style={styles.container}>
        {(searchQuery === "" ? suppliers : filteredSuppliers).map(
          (item, index) => (
            <View key={index.toString()} style={styles.supplierItem}>
              <Text style={styles.supplierText}>{item.name}</Text>
              <Text>{item.address}</Text>
              <Text>{item.contact}</Text>
              <Text>{item.categories}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEdit(index)}
                >
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={async () => await handleRemoveSupplier(index)}
                >
                  <Text style={styles.removeButtonText}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        )}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f8f8"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10
  },
  supplierItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1
  },
  supplierText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  editButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginRight: 10
  },
  editButtonText: {
    color: "#fff",
    textAlign: "center"
  },
  removeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5
  },
  removeButtonText: {
    color: "#fff",
    textAlign: "center"
  }
});
