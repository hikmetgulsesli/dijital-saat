import { useState, useCallback } from 'react';

export type UnitCategory = 'length' | 'temperature' | 'weight';

export interface Unit {
  id: string;
  name: string;
  symbol: string;
  factor: number;
  offset?: number;
}

export interface UnitCategoryData {
  id: UnitCategory;
  name: string;
  icon: string;
  units: Unit[];
}

export const UNIT_CATEGORIES: UnitCategoryData[] = [
  {
    id: 'length',
    name: 'Uzunluk',
    icon: 'straighten',
    units: [
      { id: 'm', name: 'Metre', symbol: 'm', factor: 1 },
      { id: 'km', name: 'Kilometre', symbol: 'km', factor: 1000 },
      { id: 'cm', name: 'Santimetre', symbol: 'cm', factor: 0.01 },
      { id: 'mm', name: 'Milimetre', symbol: 'mm', factor: 0.001 },
      { id: 'ft', name: 'Fit', symbol: 'ft', factor: 0.3048 },
      { id: 'in', name: 'İnç', symbol: 'in', factor: 0.0254 },
    ],
  },
  {
    id: 'temperature',
    name: 'Sıcaklık',
    icon: 'thermostat',
    units: [
      { id: 'c', name: 'Celsius', symbol: '°C', factor: 1, offset: 0 },
      { id: 'f', name: 'Fahrenheit', symbol: '°F', factor: 1.8, offset: 32 },
      { id: 'k', name: 'Kelvin', symbol: 'K', factor: 1, offset: 273.15 },
    ],
  },
  {
    id: 'weight',
    name: 'Ağırlık',
    icon: 'scale',
    units: [
      { id: 'kg', name: 'Kilogram', symbol: 'kg', factor: 1 },
      { id: 'g', name: 'Gram', symbol: 'g', factor: 0.001 },
      { id: 'mg', name: 'Miligram', symbol: 'mg', factor: 0.000001 },
      { id: 'lb', name: 'Pound', symbol: 'lb', factor: 0.453592 },
      { id: 'oz', name: 'Ons', symbol: 'oz', factor: 0.0283495 },
    ],
  },
];

export function convertValue(
  value: number,
  fromUnit: Unit,
  toUnit: Unit,
  category: UnitCategory
): number {
  if (category === 'temperature') {
    // Convert to Celsius first
    let celsius: number;
    if (fromUnit.id === 'c') {
      celsius = value;
    } else if (fromUnit.id === 'f') {
      celsius = (value - 32) / 1.8;
    } else if (fromUnit.id === 'k') {
      celsius = value - 273.15;
    } else {
      celsius = value;
    }

    // Convert from Celsius to target
    if (toUnit.id === 'c') {
      return celsius;
    } else if (toUnit.id === 'f') {
      return celsius * 1.8 + 32;
    } else if (toUnit.id === 'k') {
      return celsius + 273.15;
    }
    return celsius;
  }

  // For length and weight, simple factor conversion
  const baseValue = value * fromUnit.factor;
  return baseValue / toUnit.factor;
}

export function formatResult(value: number, precision: number): string {
  if (value === 0) return '0';
  
  // Handle very small or very large numbers
  if (Math.abs(value) < 0.0001 || Math.abs(value) > 1000000) {
    return value.toExponential(precision);
  }
  
  // Format with specified precision
  const formatted = value.toFixed(precision);
  // Remove trailing zeros
  return formatted.replace(/\.?0+$/, '');
}

export function useConverter() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnitId, setFromUnitId] = useState<string>('m');
  const [toUnitId, setToUnitId] = useState<string>('km');
  const [inputValue, setInputValue] = useState<string>('1284.5');
  const [precision, setPrecision] = useState<number>(4);
  const [autoCopy, setAutoCopy] = useState<boolean>(true);

  const categoryData = UNIT_CATEGORIES.find((c) => c.id === category)!;
  const fromUnit = categoryData.units.find((u) => u.id === fromUnitId)!;
  const toUnit = categoryData.units.find((u) => u.id === toUnitId)!;

  const numericValue = parseFloat(inputValue) || 0;
  const convertedValue = convertValue(numericValue, fromUnit, toUnit, category);
  const formattedResult = formatResult(convertedValue, precision);

  const swapUnits = useCallback(() => {
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
  }, [fromUnitId, toUnitId]);

  const copyResult = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`${formattedResult} ${toUnit.symbol}`);
      return true;
    } catch {
      return false;
    }
  }, [formattedResult, toUnit.symbol]);

  const handleCategoryChange = useCallback((newCategory: UnitCategory) => {
    setCategory(newCategory);
    const newCategoryData = UNIT_CATEGORIES.find((c) => c.id === newCategory)!;
    setFromUnitId(newCategoryData.units[0].id);
    setToUnitId(newCategoryData.units[1]?.id || newCategoryData.units[0].id);
  }, []);

  return {
    category,
    categoryData,
    fromUnit,
    toUnit,
    fromUnitId,
    toUnitId,
    inputValue,
    precision,
    autoCopy,
    formattedResult,
    numericValue,
    convertedValue,
    setFromUnitId,
    setToUnitId,
    setInputValue,
    setPrecision,
    setAutoCopy,
    swapUnits,
    copyResult,
    handleCategoryChange,
  };
}
