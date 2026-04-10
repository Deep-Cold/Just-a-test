import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Option, AsyncData, Result } from "@swan-io/boxed";
import { Flex } from "@chakra-ui/react";

import MainLayout from "../../../../components/layouts/main-layout";
import TestResultHistory from "../../../../components/test/test-result-history";
import {
  PageErrorText,
  PageLoadingText,
  PageNoDataText,
} from "../../../../components/test/result-status-texts";
import {
  TestResult,
  getAllSavedTestResult,
} from "../../../../lib/personality-test";

export default function TestResultHistoryPage() {
  const router = useRouter();

  const [testResults, setTestResults] = useState<
    AsyncData<Result<Option<TestResult[]>, Error>>
  >(AsyncData.NotAsked());

  useEffect(() => {
    if (router.isReady) {
      setTestResults(AsyncData.Loading());

      getAllSavedTestResult().tap((result) =>
        setTestResults(AsyncData.Done(result))
      );
    }
  }, [router.isReady]);

  return (
    <MainLayout>
      {testResults.match({
        NotAsked: () => <PageLoadingText />,
        Loading: () => <PageLoadingText />,
        Done: (result) =>
          result.match({
            Error: () => <PageErrorText />,
            Ok: (value) =>
              value.match({
                Some: (data) => <TestResultHistory testResults={data} />,
                None: () => <PageNoDataText />,
              }),
          }),
      })}
    </MainLayout>
  );
}
