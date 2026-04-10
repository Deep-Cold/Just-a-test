import { useMemo } from "react";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { personalityClasses } from "../../data/personality-classes";
import { PersonalityClass, TestResult } from "../../lib/personality-test";

const RADAR_STROKE = "#3498db";
const RADAR_FILL = "#3498db";

interface TestResultStatsProps {
  testResult: TestResult;
}

type RadarRow = {
  axis: PersonalityClass["type"];
  /** 维度说明（与题库 personality-classes 一致） */
  description: string;
  count: number;
  /** 与该轴对立面在同一组内的题目数之和（分母） */
  pairTotal: number;
  percent: number;
};

function pctWithinPair(count: number, pairTotal: number): number {
  return pairTotal > 0 ? (count / pairTotal) * 100 : 0;
}

function buildRadarRows(testScores: PersonalityClass["type"][]): RadarRow[] {
  const counts = new Map<PersonalityClass["type"], number>();
  for (const pc of personalityClasses) {
    counts.set(pc.type, 0);
  }
  for (const s of testScores) {
    counts.set(s, (counts.get(s) ?? 0) + 1);
  }

  const cP = counts.get("P") ?? 0;
  const cE = counts.get("E") ?? 0;
  const cS = counts.get("S") ?? 0;
  const cM = counts.get("M") ?? 0;
  const cA = counts.get("A") ?? 0;
  const cI = counts.get("I") ?? 0;
  const cC = counts.get("C") ?? 0;
  const cB = counts.get("B") ?? 0;

  const pe = cP + cE;
  const sm = cS + cM;
  const ai = cA + cI;
  const cb = cC + cB;

  const pairTotalByAxis: Record<PersonalityClass["type"], number> = {
    P: pe,
    E: pe,
    S: sm,
    M: sm,
    A: ai,
    I: ai,
    C: cb,
    B: cb,
  };

  return personalityClasses.map((pc) => {
    const count = counts.get(pc.type) ?? 0;
    const pairTotal = pairTotalByAxis[pc.type];
    return {
      axis: pc.type,
      description: pc.description,
      count,
      pairTotal,
      percent: pctWithinPair(count, pairTotal),
    };
  });
}

export default function TestResultStats(props: TestResultStatsProps) {
  const rows = useMemo(
    () => buildRadarRows(props.testResult.testScores),
    [props.testResult.testScores]
  );
  const totalQs = props.testResult.testScores.length;

  return (
    <Flex
      my={4}
      mx={{ base: 0, lg: 4 }}
      w={{
        base: "full",
        lg: "25%",
      }}
      minW={{ base: "full", lg: "220px" }}
      h="min-content"
      p={2}
      gap={4}
      top={5}
      direction="column"
      pos={{
        base: "static",
        lg: "sticky",
      }}
      alignSelf="flex-start"
    >
      <Heading
        as="h2"
        id="dimension-scores"
        textAlign="center"
        fontSize="lg"
        scrollMarginTop={8}
      >
        维度得分
      </Heading>
      <Text
        fontSize="xs"
        color="gray.600"
        textAlign="center"
      >
        共 {totalQs} 题计分 · 各轴百分比 = 该倾向题数 / 与同对立组题数之和
      </Text>
      <Box
        w="full"
        h={{ base: "min(85vw, 320px)", lg: "280px" }}
        maxW="full"
        aria-label="八维得分雷达图"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="70%"
            data={rows}
            margin={{ top: 8, right: 12, bottom: 8, left: 12 }}
          >
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fontSize: 11, fill: "#4a5568" }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tickCount={5}
              tick={{ fontSize: 10, fill: "#718096" }}
              axisLine={false}
            />
            <Radar
              name="占比"
              dataKey="percent"
              stroke={RADAR_STROKE}
              fill={RADAR_FILL}
              fillOpacity={0.35}
              strokeWidth={2}
              dot={{ r: 3, fill: RADAR_STROKE }}
            />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const row = payload[0].payload as RadarRow;
                return (
                  <Box
                    bg="white"
                    px={3}
                    py={2}
                    borderWidth="1px"
                    borderColor="gray.200"
                    rounded="md"
                    shadow="md"
                    maxW="240px"
                  >
                    <Text
                      fontWeight="semibold"
                      fontSize="sm"
                      mb={1}
                    >
                      {row.axis}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.700"
                      lineHeight="short"
                    >
                      {row.description}
                    </Text>
                  </Box>
                );
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Box>
      <SimpleGrid
        columns={2}
        spacingX={2}
        spacingY={1}
        fontSize="xs"
        color="gray.700"
      >
        {rows.map((row) => (
          <Flex
            key={row.axis}
            justify="space-between"
            gap={1}
          >
            <Text fontWeight="semibold">{row.axis}</Text>
            <Text color="gray.600">
              {row.count}/{row.pairTotal}（
              {row.percent.toFixed(1).replace(/\.0$/, "")}%）
            </Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Flex>
  );
}
