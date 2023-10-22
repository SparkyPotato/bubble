import {
    makeContractCall,
    callReadOnlyFunction,
    broadcastTransaction,
    AnchorMode,
    stringUtf8CV,
    uintCV,
    ClarityValue,
    principalCV,
} from '@stacks/transactions';

class User {
    constructor(address, key) {
        this.Address = address;
        this.Key = key;
    }

    set_nickname(nickname) {
        return this.call("set-nickname", [stringUtf8CV(nickname)]);
    }

    start_thread(title, content) {
        return this.call('start-thread', [stringUtf8CV(title), stringUtf8CV(content)]);
    }

    post_reply(thread_id, content) {
        return this.call('post-reply', [uintCV(thread_id), stringUtf8CV(content)]);
    }

    get_nickname(principal) {
        return this.read_only('get-nickname', [principalCV(principal)]);
    }

    get_thread_count() {
        return this.read_only('get-thread-count', []);
    }

    get_thread(id) {
        return this.read_only('get-thread', [uintCV(id)]);
    }

    get_post(thread, post) {
        return this.read_only('get-post', [uintCV(thread), uintCV(post)]);
    }

    private async call(func: string, args: ClarityValue[]): Promise<ClarityValue> {
        const opts = {
            contractAddress: DEPLOYER,
            contractName: 'bubble',
            functionName: func,
            functionArgs: args,
            senderKey: this.Key,
            validateWithAbi: true,
            network: "mocknet",
            anchorMode: AnchorMode.Any,
        };
        const transaction = await makeContractCall(opts);
        const response = await broadcastTransaction(transaction, "mocknet");
        return response;
    }

    private async read_only(func: string, args: ClarityValue[]): Promise<ClarityValue> {
        const opts = {
            contractAddress: DEPLOYER,
            contractName: 'bubble',
            functionName: func,
            functionArgs: args,
            network: "mocknet",
            senderAddress: this.Address,
        };
        return callReadOnlyFunction(opts);
    }

    private Address: string;
    private Key: string;
}
