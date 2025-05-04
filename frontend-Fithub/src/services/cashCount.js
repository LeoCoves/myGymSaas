// src/api/cashRegisterApi.js

const API_BASE_URL = 'https://localhost:7216/api/CashCount'; // Ajusta la URL a la de tu backend

// Obtener todos los arqueos de caja
export async function getCashCounts(idGym){
  try {
    const response = await fetch(`${API_BASE_URL}/${idGym}`);
    if (!response.ok) {
      throw new Error("Error al obtener los arqueos de caja.");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error al obtener los arqueos de caja.", error);
  }
};

// Obtener un arqueo específico por ID
export async function getCashCountById(idCashCount, idGym) {
  try {
    const response = await fetch(`${API_BASE_URL}/${idGym}/${idCashCount}`);
    if (!response.ok) {
      throw new Error("Error al obtener el arqueo de caja por ID.");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error al obtener el arqueo de caja por ID.", error);
  }
};

// Obtener insrcripciones por ID de gimnasio
export async function getInscriptions(idGym) {
  try {
    const response = await fetch(`${API_BASE_URL}/${idGym}/inscriptions`);
    if (!response.ok) {
      throw new Error("Error al obtener las inscripciones.");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error al obtener las inscripciones.", error);
  }
};

// Crear un nuevo arqueo de caja
export async function createCashCount(cashCountData){
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cashCountData),
    });
    if (!response.ok) {
      throw new Error("Error al crear el arqueo de caja.");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error al crear el arqueo de caja.", error);
  }
};
