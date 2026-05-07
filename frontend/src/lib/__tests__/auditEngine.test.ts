import { calculateAudit } from '../auditEngine';
import { AuditInput } from '../../types';

describe('auditEngine deterministic logic', () => {
  it('should correctly sum prices and suggest switching a single expensive writing tool', () => {
    const input: AuditInput = {
      tools: [
        { toolId: 'jasper-creator', seats: 2 }
      ]
    };
    const result = calculateAudit(input);
    expect(result.totalMonthlySpend).toBe(98); // 49 * 2
    expect(result.recommendations.length).toBeGreaterThan(0);
    expect(result.recommendations[0].action).toBe('switch');
  });

  it('should correctly calculate the Enterprise Volume discount (deterministic test)', () => {
    const input: AuditInput = {
      tools: [
        { toolId: 'chatgpt-plus', seats: 15 } // > 10 seats
      ]
    };
    const result = calculateAudit(input);
    expect(result.totalMonthlySpend).toBe(300); // 20 * 15
    const enterpriseRec = result.recommendations.find(r => r.message.includes('Enterprise contract'));
    expect(enterpriseRec).toBeDefined();
    expect(enterpriseRec?.savings).toBe(60); // 20% of 300 is 60
  });

  it('should support unknown custom tools with custom pricing', () => {
    const input: AuditInput = {
      tools: [
        { toolId: 'custom', customName: 'Secret Tool', customPrice: 100, seats: 1 }
      ]
    };
    const result = calculateAudit(input);
    expect(result.totalMonthlySpend).toBe(100);
    // Custom tools shouldn't trigger arbitrary AI recommendations from the frontend
    expect(result.recommendations.length).toBe(0);
  });
});
