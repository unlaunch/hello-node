import {UnlaunchFactory} from 'unlaunch-node-sdk';

// EDIT ME! Set SDK_KEY to your Unlaunch SDK key.
const SDK_KEY = 'sdkKey';

// EDIT ME!  Set FEATURE_FLAG_KEY to your feature flag key to evaluate
const FEATURE_FLAG_KEY = "flagKey";

if (!SDK_KEY || SDK_KEY && SDK_KEY.length <= 0) {
    console.error("[DEMO] You must edit hello.js to set SDK_KEY to Unlaunch SDK key. \n" +
        "Please visit https://docs.unlaunch.io/docs/sdks/sdk-keys for more information.");
    process.exit()
}

if (FEATURE_FLAG_KEY == null || FEATURE_FLAG_KEY.length <= 0) {
    LOG.error("[DEMO] You must edit hello.js to set FEATURE_FLAG_KEY to key of the flag you wish to \n" +
        "fetch. Please visit https://docs.unlaunch.io/docs/getting-started for more information.");
    process.exit()
}

// Create Unlaunch client object by using SDK_KEY and finetune configuration if needed by passing it as argument          
var factory = UnlaunchFactory({
    core: {
        sdkKey: SDK_KEY
    },
    intervals: {
        // fetch feature updates each 30 sec
        pollingInterval: 30,
        // publish metrics each 120 sec
        metricsFlushInterval: 120,
        // flush events every 60 seconds after the first flush
        eventsFlushInterval: 60,
        // http connection timeout 
        httpConnectionTimeout: 10
    },
    mode: {
        offlineMode: false
    }
});
const client = factory.client();

// Wait for the client to be ready

client.once('READY', () => {

    // Get variation
    const variation = client.variation(FEATURE_FLAG_KEY, "user-id-123");
    console.log(`[DEMO] variation() returned ${variation}`);

    if (variation == "control") {
        console.info("'[DEMO] control' variation indicates that Unlaunch Client didn't connect with the server or the" +
            " flag wasn't found.");
    }

    /** Now get Feature with evaluation reason. This is an alternate way to obtain feature 
     ** flag besides variation() method. This returns additional information such as evaluation reason.
     **/

    const feature = client.feature(FEATURE_FLAG_KEY, "user-id-123");
    console.info(`[DEMO] Feature returned variation: ${feature.variation}. Evaluation reason: ${feature.evaluationReason}`);

    /**
     * Evaluate flag using attribute
     */
    const variationWhenAttribute = client.variation(
        FEATURE_FLAG_KEY,
        'user-id-123',
        {
            "age": 12,
            "country": "US"
        });
    console.info(`[DEMO] Variation return when attributes are passed: ${variationWhenAttribute}`)

    // shutdown the client to flush any events or metrics 
    client.shutdown();
})

