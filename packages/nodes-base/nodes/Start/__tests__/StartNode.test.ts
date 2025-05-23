import type { WorkflowTestData } from 'n8n-workflow';

// This is (temporarily) needed to setup LoadNodesAndCredentials first
import '@test/nodes/Helpers';
import { executeWorkflow } from '@test/nodes/ExecuteWorkflow';

describe('Execute Start Node', () => {
	const tests: WorkflowTestData[] = [
		{
			description: 'should run start node',
			input: {
				workflowData: {
					nodes: [
						{
							id: 'uuid-1',
							parameters: {},
							name: 'Start',
							type: 'n8n-nodes-base.start',
							typeVersion: 1,
							position: [100, 300],
						},
					],
					connections: {},
				},
			},
			output: {
				nodeExecutionOrder: ['Start'],
				nodeData: {},
			},
		},
	];

	for (const testData of tests) {
		test(testData.description, async () => {
			// execute workflow
			const { result, nodeExecutionOrder } = await executeWorkflow(testData);
			// Check if the nodes did execute in the correct order
			expect(nodeExecutionOrder).toEqual(testData.output.nodeExecutionOrder);
			// Check if other data has correct value
			expect(result.finished).toEqual(true);
			expect(result.data.executionData!.contextData).toEqual({});
			expect(result.data.executionData!.nodeExecutionStack).toEqual([]);
		});
	}
});
