import { StyleSheet } from 'react-native';
import Svg, { Circle, G, Path, Rect, Text as SvgText } from 'react-native-svg';

import { colors, fontFamilies } from '@/theme/tokens';

/**
 * Illustrated map from design 1e, drawn in the design's 370×824 coordinate space
 * and scaled to cover the screen. Live maps are out of scope (HANDOFF §6).
 */
export function RouteMap() {
  return (
    <Svg
      style={StyleSheet.absoluteFill}
      viewBox="0 0 370 824"
      preserveAspectRatio="xMidYMin slice"
      accessibilityLabel="Mapa con la ruta del contratista hacia tu casa">
      <Rect x={0} y={0} width={370} height={824} fill={colors.mapBackground} />
      {/* Roads */}
      <Rect x={0} y={160} width={370} height={14} fill={colors.mapRoad} />
      <Rect x={0} y={330} width={370} height={10} fill={colors.mapRoad} />
      <Rect x={70} y={0} width={18} height={824} fill={colors.mapRoad} />
      <Rect x={210} y={0} width={12} height={824} fill={colors.mapRoad} />
      <Rect x={310} y={0} width={12} height={824} fill={colors.mapRoad} />
      {/* Blocks */}
      <Rect x={96} y={186} width={100} height={132} rx={10} fill={colors.mapPark} />
      <Rect x={236} y={30} width={62} height={118} rx={10} fill={colors.mapBlock} />
      {/* Route: travelled (dashed) and remaining */}
      <Path
        d="M79 40 L79 92"
        stroke={colors.accent}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray="2 9"
        opacity={0.5}
      />
      <Path
        d="M79 92 L79 167 L219 167 L219 335 L300 335"
        stroke={colors.accent}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Contractor marker */}
      <Circle cx={79} cy={92} r={16.5} fill={colors.ink} stroke={colors.white} strokeWidth={3} />
      <G transform="translate(71 84) scale(0.6667)">
        <Path d="M12 2l7 19-7-4-7 4 7-19z" fill={colors.white} />
      </G>
      {/* Home pin */}
      <Rect x={282} y={312} width={58} height={26} rx={10} fill={colors.accent} />
      <SvgText
        x={311}
        y={329}
        fontSize={12}
        fontFamily={fontFamilies.ui700}
        fill={colors.white}
        textAnchor="middle">
        Tu casa
      </SvgText>
      <Rect x={309.5} y={338} width={3} height={10} fill={colors.accent} />
      <Circle cx={311} cy={357} r={7.5} fill={colors.accent} stroke={colors.white} strokeWidth={3} />
    </Svg>
  );
}
