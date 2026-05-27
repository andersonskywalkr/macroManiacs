import { router } from "expo-router";
import { Bell, Plus } from "lucide-react-native";
import type { ImageSourcePropType } from "react-native";
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Svg, { Circle, ClipPath, Defs, Path, Rect, Text as SvgText } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppError } from "@/api/errors";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useHome } from "@/hooks/useBackendReadyData";
import type { MacroValue } from "@/types/macros";
import type { Ranking } from "@/types/ranking";
import mascot from "../../assets/images/brand/mascot-solo.png";
import macroCarbsIcon from "../../assets/images/macros/macro-carbs.png";
import macroFatIcon from "../../assets/images/macros/macro-fat.png";
import macroProteinIcon from "../../assets/images/macros/macro-protein.png";
import medalCooper from "../../assets/images/medals/medal-copper.png";
import medalGold from "../../assets/images/medals/medal-gold.png";
import medalSilver from "../../assets/images/medals/medal-silver.png";

const palette = {
  background: "#E1CFF9",
  headerBackground: "#CDA7FF",
  cream: "#FDF9ED",
  ink: "#280060",
  purple: "#280060",
  primarySoft: "#471C81",
  accent: "#A870DB",
  accentSoft: "#CAA1FF",
  gold: "#F5C779",
  green: "#A9C984",
  salmon: "#B36464",
  line: "#F2CDBD",
};

const podiumMedals = [medalGold, medalSilver, medalCooper];

type MacroBucketProps = {
  color: string;
  icon: ImageSourcePropType;
  letter: string;
  label: string;
  macro: MacroValue;
  unit?: "g" | "kcal";
};

const CUP_FILL_PATH =
  "M21.6648 110.862C88 92 252 92 318.051 111.009C314.38 150 302 286 294.983 344.217C293.28 360.686 292.517 378.609 280.858 391.502C267.685 406.07 250.327 409.927 231.659 411.935C218.166 413.381 204.86 414.673 191.301 415.498C164.254 415.928 138.913 415.815 112.055 412.365C93.6883 410.008 79.2216 408.899 64.1413 396.402C48.3711 383.328 47.362 366.235 45.3191 347.344C43.2761 328.715 41.5209 310.299 39.6267 291.778L21.6648 110.862Z";

const CUP_OUTLINE_PATH =
  "M182.586 0.0930949C188.932 0.0827079 204.577 -0.365835 209.831 0.803056C214.809 1.92849 219.37 4.431 222.994 8.02474C231.766 16.8285 231.092 28.6449 231.037 40.0452C249.143 40.7833 316.577 50.1991 329.228 59.0413C334.612 62.8046 338.038 69.1996 339.088 75.5716C340.246 82.6022 341.013 100.801 336.774 106.547C333.422 111.09 327.83 112.896 322.494 113.684C322.147 124.384 320.025 138.632 318.966 149.505L310.837 231.544L302.645 313.316C301.524 326.161 300.248 338.993 298.815 351.808C297.059 366.79 295.798 381.237 285.398 393.345C272.149 408.845 254.527 413.961 235.053 416.097C225.201 417.18 215.709 418.295 205.799 419.147C172.659 421.268 139.394 420.307 106.432 416.274C88.1744 413.884 76.1464 412.141 61.2087 399.911C43.1448 385.12 43.0285 366.474 40.4079 344.992C38.3302 327.958 37.0399 310.615 35.2829 293.415L17.3972 113.806C8.90849 112.118 0.689096 108.438 0.339563 98.2669C-0.0598738 86.6417 -1.43315 72.2265 6.71554 62.7552C12.7488 55.743 24.9576 53.5109 33.6706 51.4427C58.3932 45.76 83.5089 41.9475 108.804 40.0374C108.67 29.5191 108.035 18.8646 115.071 10.2484C119.959 4.2626 125.794 1.07556 133.413 0.238603C134.491 0.0850121 137.528 0.0850229 138.717 0.0803996L182.586 0.0930949ZM173.053 93.3109C167.88 93.305 154.312 92.9787 149.764 93.4808C137.715 94.118 124.09 94.7178 112.136 95.7425C90.421 97.752 68.8143 100.808 47.3933 104.899C40.7199 106.21 28.0453 108.672 21.6648 110.862L39.6267 291.778C41.5209 310.299 43.2761 328.715 45.3191 347.344C47.362 366.235 48.3711 383.328 64.1413 396.402C79.2216 408.899 93.6883 410.008 112.055 412.365C138.913 415.815 164.254 415.928 191.301 415.498C204.86 414.673 218.166 413.381 231.659 411.935C250.327 409.927 267.685 406.07 280.858 391.502C292.517 378.609 293.28 360.686 294.983 344.217L298.184 312.626L308.585 207.659L314.791 145.769L316.934 123.548C317.334 119.373 318.131 115.184 318.051 111.009C314.38 109.266 304.324 107.333 299.831 106.375C258.123 97.7376 215.646 93.3604 173.053 93.3109ZM209.932 84.8665C193.845 83.7482 175.8 82.9197 159.728 83.5775C153.614 83.8054 147.356 83.6352 141.3 83.9945C104.796 86.1611 68.6192 90.3084 32.8991 98.3314C28.3424 99.3547 14.192 101.294 13.9821 106.838C14.3524 108.051 14.6404 108.187 15.6306 108.904C16.533 109.066 17.5729 108.427 18.3151 107.854C21.3909 105.478 25.8458 104.751 29.6023 103.902C80.1189 92.4796 129.291 88.4782 181.025 88.9036C221.924 89.3474 262.678 93.8526 302.687 102.351C308.038 103.436 313.543 104.553 318.817 106.011C321.138 106.653 322.778 109.904 324.043 108.814C324.27 108.617 324.494 108.415 324.714 108.209C325.317 107.636 325.87 106.877 326.372 106.205C325.853 105.403 324.765 103.705 323.957 103.31C318.168 100.479 307.701 98.475 301.333 97.1019C271.206 90.7981 240.657 86.7087 209.932 84.8665ZM219.105 10.9202C210.024 2.12501 194.549 4.52076 182.763 4.52278C167.764 4.52539 152.445 4.21152 137.48 4.51888C136.556 4.53866 135.633 4.56287 134.71 4.59212C127.986 5.67862 122.406 8.03633 118.285 13.7503C116.265 16.5582 114.893 19.7793 114.267 23.181C113.299 28.3833 113.59 39.7987 113.597 45.6019L113.591 81.3197L119.155 81.1204L119.214 50.096C119.23 39.0374 117.513 25.4354 126.119 16.9915C128.9 14.2946 132.384 12.4344 136.173 11.6243C140.32 10.7221 145.803 10.9628 150.075 10.9925C165.772 11.1017 181.467 10.9147 197.164 10.9847C200.62 11.0001 202.448 11.2958 205.719 12.0804C211.325 14.5421 216.238 17.9947 218.581 23.9447C221.857 32.2631 220.342 69.6834 220.459 81.138C222.312 81.2033 224.963 81.2154 226.747 81.432C226.658 69.9317 226.64 58.4303 226.693 46.93C226.695 39.8059 227.175 28.41 225.458 21.8548C224.383 17.6964 222.185 13.9139 219.105 10.9202Z";

function MacroCup({ color, letter, percentage }: { color: string; letter: string; percentage: number }) {
  const cappedPercentage = Math.max(0, Math.min(percentage, 100));
  const bodyTop = 92;
  const bodyHeight = 329;
  const fillHeight = (bodyHeight * cappedPercentage) / 100;
  const fillY = bodyTop + bodyHeight - fillHeight;
  const clipId = `cup-body-${letter}`;

  return (
    <Svg width={86} height={106} viewBox="0 0 340 421" style={styles.bucketSvg}>
      <Defs>
        <ClipPath id={clipId}>
          <Path d={CUP_FILL_PATH} />
        </ClipPath>
      </Defs>
      <Path d={CUP_FILL_PATH} fill="#F8F1E2" />
      <Rect
        x={0}
        y={fillY}
        width={340}
        height={fillHeight}
        fill={color}
        clipPath={`url(#${clipId})`}
      />
      <Path d={CUP_OUTLINE_PATH} fill={palette.ink} />
      <Path
        d="M231.075 44.488C240.633 45.7565 250.633 46.4451 260.345 47.7374C275.509 49.8225 290.571 52.5954 305.483 56.0485C326.423 60.7638 336.11 63.2622 335.346 88.2018C335.164 94.1679 336.29 98.3491 332.904 103.92C332.309 104.664 332.054 105.141 331.17 105.471C329.827 104.663 329.033 101.727 328.007 100.399C323.985 95.1904 266.14 86.2392 257.564 85.017C248.737 83.8487 239.898 82.7763 231.049 81.8L231.075 44.488Z"
        fill={palette.primarySoft}
      />
      <Path
        d="M107.934 44.715L108.478 44.7124C108.988 45.4971 108.804 78.0633 108.808 81.8408C79.1088 84.4335 44.3929 90.6019 15.255 98.2718C11.0498 99.3788 10.4506 104.79 8.68203 105.685L7.97854 104.88C6.01241 102.594 4.90896 99.9499 5.01647 96.8176C5.33211 86.6941 2.9519 73.9591 10.2826 65.7754C16.4009 58.9452 28.4144 57.2951 37.1583 55.4228C59.8065 50.5728 84.8029 46.0462 107.934 44.715Z"
        fill={palette.primarySoft}
      />
      <Path
        d="M139.52 13.8057C157.431 13.3596 175.856 14.0388 193.81 13.6855C200.831 13.599 206.583 13.582 211.916 18.8066C219.655 26.3862 217.823 37.7874 217.819 47.9564L217.807 80.8294C212.594 80.8019 206.639 80.2095 201.415 79.79C180.595 78.374 157.608 79.3261 136.655 79.9746C131.837 80.1236 127.004 80.7006 122.105 80.8199L122.087 48.6017C122.077 43.5814 121.732 33.5368 122.633 28.9331C123.238 25.6716 124.666 22.6186 126.783 20.0641C130.301 15.8758 134.288 14.2972 139.52 13.8057Z"
        fill={color}
      />
      <SvgText
        x="170"
        y="62"
        fill={palette.cream}
        fontFamily="Baloo2-ExtraBold"
        fontSize="44"
        fontWeight="900"
        textAnchor="middle"
      >
        {letter}
      </SvgText>
    </Svg>
  );
}

function CalorieRing({ consumed, target, remaining }: MacroValue) {
  const size = 171;
  const strokeWidth = 25;
  const borderWidth = 29;
  const radius = (size - borderWidth) / 2 - 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(consumed / target, 1);
  const dashOffset = circumference * (1 - progress);
  const ringBorderColor = palette.primarySoft;

  return (
    <View style={styles.ringWrap}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ringBorderColor}
          strokeWidth={borderWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F8EFDD"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {progress > 0 ? (
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={ringBorderColor}
            strokeWidth={borderWidth}
            fill="transparent"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        ) : null}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={palette.accent}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <Text style={styles.calories}>{consumed}</Text>
      <Text style={styles.calorieTarget}>/{target} kcal</Text>
      <Text style={styles.remainingLabel}>Restante:</Text>
      <Text style={styles.remainingValue}>{remaining} kcal</Text>
    </View>
  );
}

function MacroBucket({ color, icon, letter, label, macro, unit = "g" }: MacroBucketProps) {
  return (
    <View style={styles.bucket}>
      <MacroCup color={color} letter={letter} percentage={macro.percentage} />
      <Text style={styles.bucketLabel}>{label}</Text>
      <View style={styles.bucketIconWindow}>
        <Image source={icon} style={styles.bucketIcon} resizeMode="contain" />
      </View>
      <Text style={styles.bucketValue}>
        {macro.consumed}
        {unit}/<Text style={styles.bucketTarget}>{macro.target}{unit}</Text>
      </Text>
    </View>
  );
}

function RankingPreview({ ranking }: { ranking?: Ranking }) {
  const entries = ranking?.entries.slice(0, 5) ?? [];

  return (
    <View style={styles.smallCard}>
      <Text style={styles.smallTitle}>
        Ranking Grupo: <Text style={styles.smallTitleLight}>Los Maniacs</Text>
      </Text>
      <View style={styles.rankList}>
        {entries.map((entry, index) => (
          <View key={entry.userId} style={styles.rankRow}>
            {index < podiumMedals.length ? (
              <Image source={podiumMedals[index]} style={styles.rankMedal} resizeMode="contain" />
            ) : (
              <View style={[styles.initials, { backgroundColor: palette.accent }]}>
                <Text style={styles.initialsText}>
                  {entry.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </Text>
              </View>
            )}
            <Text numberOfLines={1} style={styles.rankName}>
              {entry.name}
            </Text>
            <View style={styles.rankTrack}>
              <View
                style={[
                  styles.rankFill,
                  {
                    width: `${Math.max(22, Math.min(100, entry.points / 10))}%`,
                    backgroundColor: index < 2 ? palette.gold : palette.salmon,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function WeeklyPerformance({ weeklyPerformance }: { weeklyPerformance?: unknown }) {
  const rawDays = Array.isArray((weeklyPerformance as any)?.days)
    ? ((weeklyPerformance as any).days as Record<string, unknown>[])
    : [];
  const bars = Array.from({ length: 7 }, (_, index) => {
    const day = rawDays[index];
    const calories = day?.progress_percent as { calories?: number } | undefined;
    return Math.max(0, Math.min(100, Math.round(calories?.calories ?? 0)));
  });
  const labels = ["D", "S", "T", "Q", "Q", "S", "S"];

  return (
    <View style={styles.smallCard}>
      <Text style={[styles.smallTitle, styles.centerTitle]}>Desempenho Semanal</Text>
      <View style={styles.chart}>
        {bars.map((height, index) => (
          <View key={`${labels[index]}-${index}`} style={styles.chartColumn}>
            <View style={styles.barStack}>
              <View style={[styles.barPart, { height: height * 0.32, backgroundColor: palette.salmon }]} />
              <View style={[styles.barPart, { height: height * 0.42, backgroundColor: palette.gold }]} />
              <View style={[styles.barPart, { height: height * 0.16, backgroundColor: palette.green }]} />
              <View style={[styles.barPart, { height: height * 0.28, backgroundColor: palette.accent }]} />
            </View>
            <Text style={styles.chartLabel}>{labels[index]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const { data: home, isLoading, error } = useHome();
  const macros = home?.macros;
  const profile = home?.profile;
  const noActiveDiet = error instanceof AppError && error.status === 404;
  const { width } = useWindowDimensions();
  const scale = Math.min(width / 440, 1);
  const scaledHeight = 956 * scale;

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <View style={[styles.scaledFrame, { height: scaledHeight }]}>
        <View style={[styles.frame, { transform: [{ scale }] }]}>
          <View pointerEvents="none" style={styles.headerBackground} />
          <View pointerEvents="none" style={styles.headerCapsule} />
          <View pointerEvents="none" style={styles.bodyCapsule} />
          <View pointerEvents="none" style={styles.bottomCapsule} />
          <Image source={mascot} style={styles.mascot} resizeMode="cover" />
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.greeting}>
            Olá, {profile?.name ?? "Maniac"}
          </Text>
          <View style={styles.notification}>
            <Bell color={palette.ink} size={23} />
            {(home?.notifications.unreadCount ?? 0) > 0 ? (
              <View style={styles.notificationDot} />
            ) : null}
          </View>
        <View style={styles.macroCard}>
          <Text style={styles.sectionTitle}>Macros do Dia:</Text>
          {noActiveDiet ? (
            <View style={styles.emptyDiet}>
              <Text style={styles.emptyDietTitle}>Sem dieta ativa</Text>
              <Text style={styles.emptyDietCopy}>
                Importe ou confirme uma dieta para liberar metas, ranking e check-ins.
              </Text>
              <Pressable style={styles.emptyDietButton} onPress={() => router.push("/onboarding/diet-scan")}>
                <Text style={styles.emptyDietButtonText}>Importar dieta</Text>
              </Pressable>
            </View>
          ) : isLoading || !macros ? (
            <LoadingManiac />
          ) : (
            <>
              <CalorieRing {...macros.calories} />
              <View style={styles.bucketProtein}>
                <MacroBucket
                  color={palette.salmon}
                  icon={macroProteinIcon}
                  letter="P"
                  label="Proteínas"
                  macro={macros.protein}
                />
              </View>
              <View style={styles.bucketCarbs}>
                <MacroBucket
                  color={palette.gold}
                  icon={macroCarbsIcon}
                  letter="C"
                  label="Carboidratos"
                  macro={macros.carbs}
                />
              </View>
              <View style={styles.bucketFat}>
                <MacroBucket
                  color={palette.green}
                  icon={macroFatIcon}
                  letter="F"
                  label="Gorduras"
                  macro={macros.fat}
                />
              </View>
            </>
          )}
        </View>

        <Pressable style={styles.addMeal} onPress={() => router.push("/app/check-in")}>
          <Text style={styles.addMealText}>Adicionar Refeição</Text>
          <View style={styles.addIcon}>
            <Plus color={palette.purple} size={22} strokeWidth={2.4} />
          </View>
        </Pressable>

        <View style={styles.dashboardRow}>
          <RankingPreview ranking={home?.ranking} />
          <WeeklyPerformance weeklyPerformance={home?.weeklyPerformance} />
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(Object.assign({
  safeArea: {
    backgroundColor: palette.background,
    flex: 1,
  },
  content: {
    paddingBottom: 132,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    height: 72,
    justifyContent: "center",
    marginBottom: -4,
  },
  mascot: {
    height: 95,
    left: -8,
    position: "absolute",
    top: -18,
    width: 95,
  },
  greeting: {
    color: palette.ink,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0,
  },
  notification: {
    position: "absolute",
    right: 16,
    top: 30,
  },
  notificationDot: {
    backgroundColor: "#F43C6A",
    borderRadius: 4,
    height: 7,
    position: "absolute",
    right: -2,
    top: -1,
    width: 7,
  },
  macroCard: {
    backgroundColor: palette.cream,
    borderColor: palette.ink,
    borderRadius: 45,
    borderWidth: 4,
    minHeight: 394,
    paddingBottom: 22,
    paddingHorizontal: 25,
    paddingTop: 16,
  },
  sectionTitle: {
    color: palette.primarySoft,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0,
    marginLeft: 4,
  },
  ringWrap: {
    alignItems: "center",
    alignSelf: "center",
    height: 180,
    justifyContent: "center",
    marginTop: 0,
    width: 180,
  },
  calories: {
    color: palette.ink,
    fontSize: 42,
    fontWeight: "700",
    lineHeight: 48,
  },
  calorieTarget: {
    color: palette.ink,
    fontSize: 20,
    lineHeight: 25,
  },
  remainingLabel: {
    color: palette.primarySoft,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  remainingValue: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: "900",
  },
  buckets: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  bucket: {
    alignItems: "center",
    height: 112,
    width: 98,
  },
  bucketSvg: {
    height: 106,
    position: "absolute",
    top: 0,
    width: 86,
  },
  bucketLabel: {
    color: palette.ink,
    fontSize: 7,
    fontWeight: "900",
    position: "absolute",
    textAlign: "center",
    top: 36,
    width: 84,
  },
  bucketIconWindow: {
    height: 39,
    overflow: "hidden",
    position: "absolute",
    top: 59,
    width: 38,
  },
  bucketIconStrip: {
    height: 39,
    position: "absolute",
    top: 0,
    width: 92,
  },
  bucketValue: {
    bottom: -1,
    color: palette.purple,
    fontSize: 10,
    fontWeight: "900",
    position: "absolute",
  },
  bucketTarget: {
    color: palette.ink,
    fontWeight: "600",
  },
  addMeal: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: palette.cream,
    borderRadius: 15,
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    marginTop: 12,
    height: 50,
    paddingHorizontal: 24,
    width: 306,
  },
  addMealText: {
    color: palette.primarySoft,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0,
  },
  addIcon: {
    alignItems: "center",
    borderColor: palette.primarySoft,
    borderRadius: 2,
    borderWidth: 1.5,
    height: 19,
    justifyContent: "center",
    width: 19,
  },
  dashboardRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 12,
  },
  smallCard: {
    backgroundColor: palette.cream,
    borderRadius: 43,
    flex: 1,
    minHeight: 216,
    paddingHorizontal: 14,
    paddingTop: 20,
  },
  smallTitle: {
    color: palette.ink,
    fontSize: 7,
    fontWeight: "900",
    marginBottom: 13,
  },
  smallTitleLight: {
    fontWeight: "700",
  },
  centerTitle: {
    textAlign: "center",
  },
  rankList: {
    gap: 8,
  },
  rankRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
  },
  initials: {
    alignItems: "center",
    borderRadius: 999,
    height: 17,
    justifyContent: "center",
    width: 17,
  },
  initialsText: {
    color: "#FFFFFF",
    fontSize: 7,
    fontWeight: "900",
  },
  rankName: {
    color: palette.ink,
    flex: 1,
    fontSize: 11,
  },
  rankTrack: {
    backgroundColor: palette.line,
    borderRadius: 999,
    height: 5,
    overflow: "hidden",
    width: 52,
  },
  rankFill: {
    borderRadius: 999,
    height: "100%",
  },
  chart: {
    alignItems: "flex-end",
    flexDirection: "row",
    height: 126,
    justifyContent: "center",
    paddingBottom: 14,
  },
  chartColumn: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  barStack: {
    justifyContent: "flex-end",
    overflow: "hidden",
    width: 6,
  },
  barPart: {
    width: 6,
  },
  chartLabel: {
    color: palette.ink,
    fontSize: 8,
    marginTop: 8,
  },
}, {
  scaledFrame: {
    alignSelf: "center",
    overflow: "hidden",
    width: "100%",
  },
  frame: {
    backgroundColor: palette.background,
    height: 956,
    left: "50%",
    marginLeft: -220,
    position: "absolute",
    top: 0,
    width: 440,
  },
  headerBackground: {
    backgroundColor: palette.headerBackground,
    height: 108,
    left: 0,
    position: "absolute",
    top: 0,
    width: 440,
  },
  headerCapsule: {
    backgroundColor: "#DCCAF6",
    borderColor: "#000000",
    borderRadius: 45,
    borderWidth: 4,
    height: 956,
    left: -28,
    position: "absolute",
    top: 93,
    width: 496,
  },
  bodyCapsule: {
    backgroundColor: palette.cream,
    borderColor: palette.ink,
    borderRadius: 43,
    borderWidth: 4,
    height: 388,
    left: 28,
    position: "absolute",
    top: 108,
    width: 383,
  },
  bottomCapsule: {
    height: 0,
  },
  mascot: {
    height: 100,
    left: 19,
    position: "absolute",
    top: 31,
    width: 100,
    zIndex: 5,
  },
  greeting: {
    color: palette.ink,
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 24,
    fontWeight: "800",
    left: 125,
    letterSpacing: 0,
    lineHeight: 32,
    position: "absolute",
    textAlign: "center",
    top: 55,
    width: 190,
    zIndex: 5,
  },
  notification: {
    height: 22,
    left: 361,
    position: "absolute",
    top: 61,
    width: 22,
    zIndex: 5,
  },
  notificationDot: {
    backgroundColor: "#F43C6A",
    borderRadius: 3,
    height: 6,
    position: "absolute",
    right: -3,
    top: -1,
    width: 6,
  },
  macroBorder: {
    backgroundColor: "transparent",
    borderRadius: 44,
    height: 394,
    left: 25,
    position: "absolute",
    top: 105,
    width: 390,
  },
  macroCard: {
    backgroundColor: "transparent",
    borderRadius: 0,
    height: 388,
    left: 28,
    position: "absolute",
    top: 108,
    width: 383,
  },
  emptyDiet: {
    alignItems: "center",
    gap: 10,
    left: 56,
    position: "absolute",
    top: 115,
    width: 270,
  },
  emptyDietTitle: {
    color: palette.ink,
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 32,
    textAlign: "center",
  },
  emptyDietCopy: {
    color: palette.primarySoft,
    fontFamily: "Baloo2-Bold",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: "center",
  },
  emptyDietButton: {
    alignItems: "center",
    backgroundColor: palette.accent,
    borderColor: palette.ink,
    borderRadius: 14,
    borderWidth: 2,
    height: 44,
    justifyContent: "center",
    marginTop: 4,
    paddingHorizontal: 18,
  },
  emptyDietButtonText: {
    color: palette.cream,
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 20,
  },
  sectionTitle: {
    color: palette.primarySoft,
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 17,
    fontWeight: "800",
    left: 18,
    letterSpacing: 0,
    lineHeight: 20,
    position: "absolute",
    top: 14,
    width: 134,
  },
  ringWrap: {
    alignItems: "center",
    height: 171,
    justifyContent: "center",
    left: 107,
    position: "absolute",
    top: 44,
    width: 171,
  },
  calories: {
    color: palette.ink,
    fontFamily: "Baloo2-Bold",
    fontSize: 34,
    fontWeight: "700",
    lineHeight: 38,
  },
  calorieTarget: {
    color: palette.ink,
    fontFamily: "Baloo2-Regular",
    fontSize: 17,
    lineHeight: 20,
  },
  remainingLabel: {
    color: palette.ink,
    fontFamily: "Baloo2-Regular",
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 13,
  },
  remainingValue: {
    color: palette.ink,
    fontFamily: "Baloo2-Bold",
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 13,
  },
  bucketProtein: {
    height: 132,
    left: 26,
    position: "absolute",
    top: 244,
    width: 95,
  },
  bucketCarbs: {
    height: 132,
    left: 145,
    position: "absolute",
    top: 244,
    width: 95,
  },
  bucketFat: {
    height: 132,
    left: 264,
    position: "absolute",
    top: 244,
    width: 95,
  },
  bucket: {
    alignItems: "center",
    height: 132,
    width: 95,
  },
  bucketSvg: {
    height: 118,
    position: "absolute",
    top: 0,
    width: 95,
  },
  bucketLabel: {
    color: "#380A73",
    fontFamily: "Baloo2-Bold",
    fontSize: 9,
    fontWeight: "700",
    lineHeight: 12,
    position: "absolute",
    textAlign: "center",
    top: 32,
    width: 95,
  },
  bucketIconWindow: {
    alignItems: "center",
    height: 43,
    justifyContent: "center",
    overflow: "hidden",
    position: "absolute",
    top: 65,
    width: 43,
  },
  bucketIcon: {
    height: 43,
    width: 43,
  },
  bucketValue: {
    bottom: 0,
    color: palette.purple,
    fontFamily: "Baloo2-Bold",
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 12,
    position: "absolute",
    textAlign: "center",
    width: 95,
  },
  bucketTarget: {
    color: palette.ink,
    fontFamily: "Baloo2-Regular",
    fontWeight: "400",
  },
  addMeal: {
    alignItems: "center",
    backgroundColor: palette.cream,
    borderRadius: 15,
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    left: 67,
    position: "absolute",
    top: 510,
    width: 306,
  },
  addMealText: {
    color: palette.primarySoft,
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 27,
    textAlign: "center",
    width: 219,
  },
  addIcon: {
    alignItems: "center",
    borderColor: palette.primarySoft,
    borderRadius: 2,
    borderWidth: 1.5,
    height: 19,
    justifyContent: "center",
    position: "absolute",
    right: 25,
    top: 16,
    width: 19,
  },
  dashboardRow: {
    flexDirection: "row",
    gap: 18,
    height: 216,
    left: 20,
    position: "absolute",
    top: 572,
    width: 403,
  },
  smallCard: {
    backgroundColor: palette.cream,
    borderRadius: 45,
    height: 216,
    paddingHorizontal: 0,
    paddingTop: 0,
    width: 188,
  },
  smallTitle: {
    color: palette.ink,
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 9,
    fontWeight: "800",
    left: 31,
    lineHeight: 12,
    position: "absolute",
    textAlign: "center",
    top: 11,
    width: 126,
  },
  rankList: {
    gap: 8,
    left: 32,
    position: "absolute",
    top: 47,
    width: 136,
  },
  rankRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
  },
  initials: {
    alignItems: "center",
    borderRadius: 999,
    height: 15,
    justifyContent: "center",
    width: 15,
  },
  rankMedal: {
    height: 20,
    marginLeft: -3,
    marginRight: -2,
    width: 20,
  },
  initialsText: {
    color: "#FFFFFF",
    fontFamily: "Baloo2-Bold",
    fontSize: 7,
    fontWeight: "900",
  },
  rankName: {
    color: "#000000",
    flex: 1,
    fontFamily: "Baloo2-Regular",
    fontSize: 12,
    lineHeight: 15,
  },
  chart: {
    alignItems: "flex-end",
    flexDirection: "row",
    height: 130,
    justifyContent: "center",
    left: 28,
    position: "absolute",
    top: 55,
    width: 140,
  },
  chartLabel: {
    color: "#000000",
    fontFamily: "Baloo2-Regular",
    fontSize: 9,
    lineHeight: 9,
    marginTop: 8,
  },
}) as any);
