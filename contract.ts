import {
    makeContractCall,
    callReadOnlyFunction,
    broadcastTransaction,
    AnchorMode,
    FungibleConditionCode,
    makeStandardSTXPostCondition,
    stringUtf8CV,
    uintCV,
    ClarityValue,
    principalCV,
} from '@stacks/transactions';
import { StacksMocknet } from '@stacks/network';

const DEPLOYER = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';

interface Thread {
    title: string,
    posts: bigint,
}

interface Post {
    author: string,
    content: string,
}

class User {
    public User(address: string, key: string) {
        this.Address = address;
        this.Key = key;
    }

    public set_nickname(nickname: string): Promise<string> {
        return this.call("set-nickname", [stringUtf8CV(nickname)]);
    }

    public start_thread(title: string, content: string): Promise<bigint> {
        return this.call('start-thread', [stringUtf8CV(title), stringUtf8CV(content)]);
    }

    public post_reply(thread_id: bigint, content: string): Promise<bigint> {
        return this.call('post-reply', [uintCV(thread_id), stringUtf8CV(content)]);
    }

    public get_nickname(principal: string): Promise<string> {
        return this.read_only('get-nickname', [principalCV(principal)]);
    }

    public get_thread_count(): Promise<bigint> {
        return this.read_only('get-thread-count', []);
    }

    public get_thread(id: bigint): Promise<Thread> {
        return this.read_only('get-thread', [uintCV(id)]);
    }

    public get_post(thread: bigint, post: bigint): Promise<Post> {
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
