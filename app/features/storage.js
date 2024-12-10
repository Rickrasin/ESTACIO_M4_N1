import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

// Salvar um fornecedor na lista
export const saveSupplier = async (supplier) => {
  try {
    const supplierId = uuid.v4();
    const newSupplier = { ...supplier, id: supplierId };
    const suppliers = JSON.parse(await AsyncStorage.getItem("suppliers")) || [];
    suppliers.push(newSupplier);
    await AsyncStorage.setItem("suppliers", JSON.stringify(suppliers));
  } catch (error) {
    console.error("Erro ao salvar fornecedor", error);
  }
};

// Recuperar a lista de fornecedores
export const getSuppliers = async () => {
  try {
    const suppliers = await AsyncStorage.getItem("suppliers");
    const allKeys = await AsyncStorage.getAllKeys();
    console.log(allKeys);
    return suppliers ? JSON.parse(suppliers) : [];
  } catch (error) {
    console.error("Erro ao buscar fornecedores", error);
    return [];
  }
};

// Recuperar um fornecedor da lista
export const getSupplier = async () => {
  try {
    const suppliers = await AsyncStorage.getItem("suppliers");
    return suppliers ? JSON.parse(suppliers) : [];
  } catch (error) {
    console.error("Erro ao buscar fornecedores", error);
    return [];
  }
};

export const editSupplier = async (updatedSupplier) => {
  try {
    const suppliersString = await AsyncStorage.getItem("suppliers");
    const suppliers = suppliersString ? JSON.parse(suppliersString) : [];

    const updatedSuppliers = suppliers.map((supplier) =>
      supplier.id === updatedSupplier.id ? updatedSupplier : supplier
    );

    await AsyncStorage.setItem("suppliers", JSON.stringify(updatedSuppliers));

    console.log("Fornecedor atualizado com sucesso!");
    return updatedSuppliers;
  } catch (error) {
    console.error("Erro ao editar fornecedor:", error);
  }
};

// Deletar Fornecedores Específicos
export const deleteSupplier = async (id) => {
  try {
    const suppliersString = await AsyncStorage.getItem("suppliers");
    const suppliers = suppliersString ? JSON.parse(suppliersString) : [];

    const updatedSuppliers = suppliers.filter((supplier) => supplier.id !== id);

    await AsyncStorage.setItem("suppliers", JSON.stringify(updatedSuppliers));

    console.log("Fornecedor removido com sucesso!");
    return updatedSuppliers;
  } catch (error) {
    console.error("Erro ao remover fornecedor:", error);
  }
};

// Limpar todos os fornecedores
export const clearSuppliers = async () => {
  try {
    await AsyncStorage.removeItem("suppliers");
    console.log("Todos os fornecedores foram removidos!");
  } catch (error) {
    console.error("Erro ao limpar fornecedores", error);
  }
};
