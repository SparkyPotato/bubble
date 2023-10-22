
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.8.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
    name: "Marwan is depressed",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        // arrange: set up the chain, state, and other required elements
        let wallet_1 = accounts.get("wallet_1")!;

        // act: perform actions related to the current test
        let block = chain.mineBlock([
            Tx.contractCall("bubble", "set-nickname", [types.utf8("Amogus")], wallet_1.address),
            Tx.contractCall("bubble", "start-thread", [types.utf8("Marwan sucks"), types.utf8("Why you so dum")], wallet_1.address),
            Tx.contractCall("bubble", "post-reply", [types.uint(0), types.utf8("Why you replying yourself")], wallet_1.address),
        ]);

        let [r1, r2, r3] = block.receipts;
        assertEquals(r1.result, "(ok u\"Amogus\")");
        assertEquals(r2.result, "(ok u0)");
        assertEquals(r3.result, "(ok u1)");

        let thread_count = chain.callReadOnlyFn("bubble", "get-thread-count", [], wallet_1.address);
        let nickname = chain.callReadOnlyFn("bubble", "get-nickname", [types.principal(wallet_1.address)], wallet_1.address);
        let thread = chain.callReadOnlyFn("bubble", "get-thread", [types.uint(0)], wallet_1.address);
        let reply1 = chain.callReadOnlyFn("bubble", "get-post", [types.uint(0), types.uint(0)], wallet_1.address);
        let reply2 = chain.callReadOnlyFn("bubble", "get-post", [types.uint(0), types.uint(1)], wallet_1.address);

        assertEquals(thread_count.result, "u1");
        assertEquals(thread.result, "(some {posts: u2, title: u\"Marwan sucks\"})");
        assertEquals(nickname.result, "(some u\"Amogus\")");
        assertEquals(reply1.result, "(some {content: u\"Why you so dum\", username: u\"Amogus\"})");
        assertEquals(reply2.result, "(some {content: u\"Why you replying yourself\", username: u\"Amogus\"})");
    },
});
