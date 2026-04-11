import { describe, it, expect } from 'vitest';
import { 
  convertValue, 
  formatResult,
  UNIT_CATEGORIES 
} from '../useConverter';
import type { Unit, UnitCategory } from '../useConverter';

describe('useConverter', () => {
  describe('convertValue', () => {
    const lengthCategory: UnitCategory = 'length';
    const tempCategory: UnitCategory = 'temperature';
    const weightCategory: UnitCategory = 'weight';

    describe('length conversions', () => {
      const metre: Unit = { id: 'm', name: 'Metre', symbol: 'm', factor: 1 };
      const kilometre: Unit = { id: 'km', name: 'Kilometre', symbol: 'km', factor: 1000 };
      const centimetre: Unit = { id: 'cm', name: 'Santimetre', symbol: 'cm', factor: 0.01 };

      it('converts metres to kilometres', () => {
        const result = convertValue(1000, metre, kilometre, lengthCategory);
        expect(result).toBe(1);
      });

      it('converts kilometres to metres', () => {
        const result = convertValue(5, kilometre, metre, lengthCategory);
        expect(result).toBe(5000);
      });

      it('converts centimetres to metres', () => {
        const result = convertValue(100, centimetre, metre, lengthCategory);
        expect(result).toBe(1);
      });

      it('handles decimal values', () => {
        const result = convertValue(1284.5, metre, kilometre, lengthCategory);
        expect(result).toBeCloseTo(1.2845, 4);
      });
    });

    describe('temperature conversions', () => {
      const celsius: Unit = { id: 'c', name: 'Celsius', symbol: '°C', factor: 1, offset: 0 };
      const fahrenheit: Unit = { id: 'f', name: 'Fahrenheit', symbol: '°F', factor: 1.8, offset: 32 };
      const kelvin: Unit = { id: 'k', name: 'Kelvin', symbol: 'K', factor: 1, offset: 273.15 };

      it('converts Celsius to Fahrenheit', () => {
        const result = convertValue(0, celsius, fahrenheit, tempCategory);
        expect(result).toBe(32);
      });

      it('converts Celsius to Kelvin', () => {
        const result = convertValue(0, celsius, kelvin, tempCategory);
        expect(result).toBe(273.15);
      });

      it('converts Fahrenheit to Celsius', () => {
        const result = convertValue(32, fahrenheit, celsius, tempCategory);
        expect(result).toBe(0);
      });

      it('converts Kelvin to Celsius', () => {
        const result = convertValue(273.15, kelvin, celsius, tempCategory);
        expect(result).toBe(0);
      });

      it('converts boiling point correctly', () => {
        const result = convertValue(100, celsius, fahrenheit, tempCategory);
        expect(result).toBe(212);
      });
    });

    describe('weight conversions', () => {
      const kg: Unit = { id: 'kg', name: 'Kilogram', symbol: 'kg', factor: 1 };
      const gram: Unit = { id: 'g', name: 'Gram', symbol: 'g', factor: 0.001 };
      const pound: Unit = { id: 'lb', name: 'Pound', symbol: 'lb', factor: 0.453592 };

      it('converts kilograms to grams', () => {
        const result = convertValue(1, kg, gram, weightCategory);
        expect(result).toBe(1000);
      });

      it('converts grams to kilograms', () => {
        const result = convertValue(500, gram, kg, weightCategory);
        expect(result).toBe(0.5);
      });

      it('converts pounds to kilograms', () => {
        const result = convertValue(1, pound, kg, weightCategory);
        expect(result).toBeCloseTo(0.453592, 6);
      });
    });
  });

  describe('formatResult', () => {
    it('formats whole numbers without decimals', () => {
      expect(formatResult(100, 4)).toBe('100');
    });

    it('formats with specified precision', () => {
      expect(formatResult(1.2845, 4)).toBe('1.2845');
    });

    it('removes trailing zeros', () => {
      expect(formatResult(1.5, 4)).toBe('1.5');
    });

    it('handles zero', () => {
      expect(formatResult(0, 4)).toBe('0');
    });

    it('handles very small numbers with scientific notation', () => {
      const result = formatResult(0.000001, 4);
      expect(result).toContain('e');
    });

    it('handles very large numbers with scientific notation', () => {
      const result = formatResult(10000000, 4);
      expect(result).toContain('e');
    });

    it('handles negative numbers', () => {
      expect(formatResult(-273.15, 2)).toBe('-273.15');
    });
  });

  describe('UNIT_CATEGORIES', () => {
    it('has length category', () => {
      const length = UNIT_CATEGORIES.find(c => c.id === 'length');
      expect(length).toBeDefined();
      expect(length?.name).toBe('Uzunluk');
      expect(length?.units.length).toBeGreaterThan(0);
    });

    it('has temperature category', () => {
      const temp = UNIT_CATEGORIES.find(c => c.id === 'temperature');
      expect(temp).toBeDefined();
      expect(temp?.name).toBe('Sıcaklık');
    });

    it('has weight category', () => {
      const weight = UNIT_CATEGORIES.find(c => c.id === 'weight');
      expect(weight).toBeDefined();
      expect(weight?.name).toBe('Ağırlık');
    });
  });
});
