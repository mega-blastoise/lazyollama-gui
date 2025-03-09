import { describe, it, expect, beforeEach, jest } from 'bun:test';
import LazyOllama, { OllamaClient } from './index';

describe('OllamaClient', () => {
  let client: OllamaClient;

  beforeEach(() => {
    client = LazyOllama.getInstance();
  });

  it('should initialize cache correctly', () => {
    expect(client['cache'].size).toBe(6);
  });

  it('should check model state in caches', () => {
    client['cache'].get('pull-queued')!.add('model1');
    const state = client.checkModelStateInCaches('model1');
    expect(state).toEqual({ model1: ['pull-queued'] });
  });

  it('should perform a POST request', async () => {
    const mockResponse = { status: 'success' };
    (client as any)._post.mockResolvedValue(mockResponse);

    const response = await (client as any)._post('/api/test', { test: 'data' });
    expect(response).toEqual(mockResponse);
  });

  it('should perform a GET request', async () => {
    const mockResponse = { data: 'test' };
    (client as any)._get.mockResolvedValue(mockResponse);

    const response = await (client as any)._get('/api/test');
    expect(response).toEqual(mockResponse);
  });

  it('should index running models', async () => {
    const mockRunningModels = { models: [{ name: 'model1' }] };
    (client as any)._get.mockResolvedValue(mockRunningModels);

    await client.indexRunningModels();
    expect(client['cache'].get('running')!.has('model1')).toBe(true);
  });

  it('should get running models', async () => {
    const mockRunningModels = { models: [{ name: 'model1' }] };
    (client as any)._get.mockResolvedValue(mockRunningModels);

    const response = await client.getRunningModels();
    expect(response).toEqual(mockRunningModels as any);
  });

  it('should pull a model', async () => {
    const mockResponse = { status: 'success' };
    (client as any)._post.mockResolvedValue(mockResponse);

    await client.pullModel('model1');
    expect(client['cache'].get('pull-completed')!.has('model1')).toBe(true);
  });

  it('should start a model', async () => {
    const mockResponse = { done: true };
    (client as any)._post.mockResolvedValue(mockResponse);

    await client.startModel('model1');
    expect(client['cache'].get('running')!.has('model1')).toBe(true);
  });

  it('should prompt a model', async () => {
    const mockResponse = { response: 'test response' };
    (client as any)._post.mockResolvedValue(mockResponse);

    const response = await client.promptModel({
      model: 'model1',
      prompt: 'test prompt'
    });
    expect(response).toEqual(mockResponse);
  });

  it('should stop a model', async () => {
    const mockResponse = { done: true };
    (client as any)._post.mockResolvedValue(mockResponse);

    await client.stopModel('model1');
    expect(client['cache'].get('running')!.has('model1')).toBe(false);
  });

  it('should cleanup memory', async () => {
    const mockRunningModels = { models: [{ name: 'model1' }] };
    (client as any)._get.mockResolvedValue(mockRunningModels);
    const mockResponse = { done: true };
    (client as any)._post.mockResolvedValue(mockResponse);

    const response = await client.cleanupMemory();
    expect(response).toEqual([mockResponse]);
  });
});
