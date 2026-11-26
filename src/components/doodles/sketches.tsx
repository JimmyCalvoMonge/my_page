/**
 * Faint background sketches: equations, data diagrams and code.
 * Everything draws in `currentColor`; the `accent` and `highlight` classes
 * pick up a hint of blue or yellow.
 */
import type { ReactNode } from 'react'
import styles from './Doodles.module.css'

type SketchProps = { width: number; height: number; children: ReactNode }

function Sketch({ width, height, children }: SketchProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

/** A line with a small open arrowhead at its end. */
function Arrow({ x1, y1, x2, y2, bend = 0 }: { x1: number; y1: number; x2: number; y2: number; bend?: number }) {
  const mx = (x1 + x2) / 2 - (y2 - y1) * bend
  const my = (y1 + y2) / 2 + (x2 - x1) * bend
  const angle = Math.atan2(y2 - my, x2 - mx)
  const head = 7
  const a1 = angle + Math.PI - 0.45
  const a2 = angle + Math.PI + 0.45
  return (
    <>
      <path d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`} />
      <path
        d={`M${x2 + head * Math.cos(a1)} ${y2 + head * Math.sin(a1)} L${x2} ${y2} L${x2 + head * Math.cos(a2)} ${y2 + head * Math.sin(a2)}`}
      />
    </>
  )
}

function Hand({ x, y, size = 26, children, className = '' }: { x: number; y: number; size?: number; children: ReactNode; className?: string }) {
  return (
    <text x={x} y={y} fontSize={size} className={`${styles.hand} ${className}`} stroke="none" fill="currentColor">
      {children}
    </text>
  )
}

function Code({ x, y, lines, size = 13 }: { x: number; y: number; lines: ReactNode[]; size?: number }) {
  return (
    <text x={x} y={y} fontSize={size} className={styles.code} stroke="none" fill="currentColor">
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : size * 1.55} xmlSpace="preserve">
          {line}
        </tspan>
      ))}
    </text>
  )
}

const Kw = ({ children }: { children: ReactNode }) => <tspan className={styles.accent}>{children}</tspan>
const Str = ({ children }: { children: ReactNode }) => <tspan className={styles.highlight}>{children}</tspan>

/* Math -------------------------------------------------------------------- */

export const Euler = () => (
  <Sketch width={230} height={70}>
    <Hand x={4} y={50} size={40}>
      e<tspan dy={-16} fontSize={24}>iπ</tspan>
      <tspan dy={16}> + 1 = 0</tspan>
    </Hand>
    <path d="M6 60 Q 110 68 220 58" />
  </Sketch>
)

export const Gaussian = () => (
  <Sketch width={290} height={96}>
    <Hand x={4} y={66} size={60}>∫</Hand>
    <Hand x={26} y={18} size={18}>∞</Hand>
    <Hand x={14} y={90} size={18}>−∞</Hand>
    <Hand x={44} y={60} size={34}>
      e<tspan dy={-14} fontSize={22}>−x²</tspan>
      <tspan dy={14}> dx = √π</tspan>
    </Hand>
  </Sketch>
)

export const Basel = () => (
  <Sketch width={250} height={110}>
    <Hand x={6} y={20} size={18}>∞</Hand>
    <Hand x={2} y={68} size={56}>Σ</Hand>
    <Hand x={4} y={100} size={18}>n=1</Hand>
    <Hand x={58} y={44} size={28}>1</Hand>
    <path d="M50 54 L84 54" />
    <Hand x={52} y={82} size={28}>n²</Hand>
    <Hand x={98} y={64} size={30}>=</Hand>
    <Hand x={132} y={44} size={28} className={styles.highlight}>π²</Hand>
    <path d="M128 54 L168 54" />
    <Hand x={140} y={82} size={28}>6</Hand>
  </Sketch>
)

export const Epsilon = () => (
  <Sketch width={300} height={80}>
    <Hand x={4} y={32} size={28}>∀ε &gt; 0 ∃δ &gt; 0 :</Hand>
    <Hand x={22} y={68} size={26}>|x − a| &lt; δ ⇒ |f(x) − L| &lt; ε</Hand>
  </Sketch>
)

export const Bayes = () => (
  <Sketch width={300} height={90}>
    <Hand x={4} y={52} size={28}>P(A | B) =</Hand>
    <Hand x={128} y={36} size={26}>P(B | A) P(A)</Hand>
    <path d="M124 46 L282 46" />
    <Hand x={176} y={76} size={26}>P(B)</Hand>
  </Sketch>
)

export const Fourier = () => (
  <Sketch width={330} height={70}>
    <Hand x={4} y={44} size={30}>
      f̂(ξ) = ∫ f(x) e<tspan dy={-12} fontSize={20}>−2πixξ</tspan>
      <tspan dy={12}> dx</tspan>
    </Hand>
  </Sketch>
)

export const Eigen = () => (
  <Sketch width={260} height={110}>
    <path d="M14 14 Q6 50 14 90" />
    <path d="M96 14 Q104 50 96 90" />
    <Hand x={24} y={44} size={24}>a   b</Hand>
    <Hand x={24} y={80} size={24}>c   d</Hand>
    <Hand x={118} y={60} size={26}>v = λv</Hand>
    <Hand x={118} y={96} size={20}>det(A − λI) = 0</Hand>
  </Sketch>
)

/** A commutative square, an algebraic-geometry staple. */
export const CommSquare = () => (
  <Sketch width={220} height={180}>
    <Hand x={20} y={36} size={28}>X</Hand>
    <Hand x={176} y={36} size={28}>Y</Hand>
    <Hand x={20} y={160} size={28}>S</Hand>
    <Hand x={176} y={160} size={28}>T</Hand>
    <Arrow x1={48} y1={28} x2={166} y2={28} />
    <Arrow x1={48} y1={152} x2={166} y2={152} />
    <Arrow x1={28} y1={46} x2={28} y2={130} />
    <Arrow x1={184} y1={46} x2={184} y2={130} />
    <Hand x={100} y={20} size={20}>f</Hand>
    <Hand x={100} y={174} size={20}>g</Hand>
    <Hand x={6} y={96} size={20}>π</Hand>
    <Hand x={194} y={96} size={20}>π′</Hand>
    <Hand x={92} y={102} size={26} className={styles.accent}>↻</Hand>
  </Sketch>
)

export const Pythagoras = () => (
  <Sketch width={230} height={150}>
    <path d="M20 130 L180 130 L20 30 Z" />
    <path d="M20 116 L34 116 L34 130" />
    <Hand x={92} y={148} size={22}>a</Hand>
    <Hand x={2} y={86} size={22}>b</Hand>
    <Hand x={104} y={74} size={22}>c</Hand>
    <Hand x={120} y={40} size={24} className={styles.highlight}>a² + b² = c²</Hand>
  </Sketch>
)

export const BellCurve = () => {
  const pts: string[] = []
  for (let i = 0; i <= 60; i++) {
    const x = -3 + (i / 60) * 6
    const y = Math.exp((-x * x) / 2)
    pts.push(`${i === 0 ? 'M' : 'L'}${(20 + (i / 60) * 220).toFixed(1)} ${(120 - y * 90).toFixed(1)}`)
  }
  return (
    <Sketch width={260} height={160}>
      <path d="M12 120 L250 120" />
      <path d={pts.join(' ')} className={styles.accentStroke} />
      <path d="M130 30 L130 120" strokeDasharray="3 5" />
      <path d="M130 84 L166 84" />
      <Hand x={124} y={144} size={20}>μ</Hand>
      <Hand x={140} y={78} size={18}>σ</Hand>
      <Hand x={170} y={30} size={22}>N(μ, σ²)</Hand>
    </Sketch>
  )
}

/* Data architecture -------------------------------------------------------- */

function Box({ x, y, w, h, label, size = 12 }: { x: number; y: number; w: number; h: number; label: string; size?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={6} />
      <text
        x={x + w / 2}
        y={y + h / 2 + size * 0.35}
        fontSize={size}
        textAnchor="middle"
        className={styles.code}
        stroke="none"
        fill="currentColor"
      >
        {label}
      </text>
    </>
  )
}

function Cylinder({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  const ry = 7
  return (
    <>
      <ellipse cx={x + w / 2} cy={y + ry} rx={w / 2} ry={ry} />
      <path d={`M${x} ${y + ry} L${x} ${y + h - ry} A${w / 2} ${ry} 0 0 0 ${x + w} ${y + h - ry} L${x + w} ${y + ry}`} />
      <text
        x={x + w / 2}
        y={y + h / 2 + 8}
        fontSize={12}
        textAnchor="middle"
        className={styles.code}
        stroke="none"
        fill="currentColor"
      >
        {label}
      </text>
    </>
  )
}

export const Pipeline = () => (
  <Sketch width={560} height={130}>
    <Box x={4} y={44} w={84} h={36} label="sources" />
    <Arrow x1={92} y1={62} x2={124} y2={62} />
    <Box x={128} y={44} w={80} h={36} label="ingest" />
    <Arrow x1={212} y1={62} x2={244} y2={62} />
    <Cylinder x={248} y={34} w={76} h={58} label="lake" />
    <Arrow x1={328} y1={62} x2={360} y2={62} />
    <Cylinder x={364} y={34} w={96} h={58} label="warehouse" />
    <Arrow x1={464} y1={62} x2={496} y2={62} />
    <Box x={500} y={44} w={54} h={36} label="BI" />
    <Hand x={142} y={22} size={20}>batch + stream</Hand>
    <Arrow x1={300} y1={112} x2={380} y2={100} bend={0.25} />
    <Hand x={386} y={124} size={20} className={styles.highlight}>dbt</Hand>
  </Sketch>
)

export const StarSchema = () => (
  <Sketch width={300} height={230}>
    <Box x={100} y={92} w={100} h={44} label="fct_sales" size={13} />
    <Box x={8} y={14} w={90} h={30} label="dim_date" />
    <Box x={202} y={14} w={90} h={30} label="dim_store" />
    <Box x={8} y={186} w={96} h={30} label="dim_product" />
    <Box x={196} y={186} w={96} h={30} label="dim_customer" />
    <path d="M60 44 L120 92 M240 44 L180 92 M60 186 L120 136 M240 186 L180 136" />
    <Hand x={210} y={120} size={18} className={styles.accent}>1 : n</Hand>
  </Sketch>
)

export const Dag = () => {
  const node = (x: number, y: number, label: string, accent = false) => (
    <>
      <circle cx={x} cy={y} r={6} className={accent ? styles.highlightFill : undefined} />
      <text x={x + 12} y={y + 4} fontSize={11} className={styles.code} stroke="none" fill="currentColor">
        {label}
      </text>
    </>
  )
  return (
    <Sketch width={340} height={160}>
      <Arrow x1={20} y1={30} x2={104} y2={30} />
      <Arrow x1={20} y1={120} x2={104} y2={120} />
      <Arrow x1={116} y1={34} x2={204} y2={72} />
      <Arrow x1={116} y1={116} x2={204} y2={80} />
      <Arrow x1={216} y1={76} x2={250} y2={76} />
      {node(14, 30, '')}
      {node(14, 120, '')}
      {node(110, 30, 'stg_orders')}
      {node(110, 120, 'stg_users')}
      {node(210, 76, '')}
      {node(256, 76, 'fct_revenue', true)}
      <Hand x={4} y={154} size={18}>raw</Hand>
      <Hand x={180} y={108} size={18}>int_orders</Hand>
    </Sketch>
  )
}

/* Code -------------------------------------------------------------------- */

export const SqlAggregate = () => (
  <Sketch width={300} height={110}>
    <Code
      x={4}
      y={18}
      lines={[
        <><Kw>SELECT</Kw> region,</>,
        <>       <Kw>SUM</Kw>(revenue) <Kw>AS</Kw> total</>,
        <><Kw>FROM</Kw> fct_sales</>,
        <><Kw>GROUP BY</Kw> region</>,
        <><Kw>ORDER BY</Kw> total <Kw>DESC</Kw>;</>,
      ]}
    />
  </Sketch>
)

export const SqlWindow = () => (
  <Sketch width={420} height={110}>
    <Code
      x={4}
      y={18}
      lines={[
        <><Kw>WITH</Kw> latest <Kw>AS</Kw> (</>,
        <>  <Kw>SELECT</Kw> *, <Kw>ROW_NUMBER</Kw>() <Kw>OVER</Kw> (</>,
        <>    <Kw>PARTITION BY</Kw> id <Kw>ORDER BY</Kw> updated_at <Kw>DESC</Kw></>,
        <>  ) <Kw>AS</Kw> rn <Kw>FROM</Kw> raw.events</>,
        <>) <Kw>SELECT</Kw> * <Kw>FROM</Kw> latest <Kw>WHERE</Kw> rn = 1;</>,
      ]}
    />
  </Sketch>
)

export const PythonPrimes = () => (
  <Sketch width={400} height={100}>
    <Code
      x={4}
      y={18}
      lines={[
        <><Kw>from</Kw> math <Kw>import</Kw> isqrt</>,
        '',
        <><Kw>def</Kw> is_prime(n: int) -&gt; bool:</>,
        <>    <Kw>return</Kw> n &gt; 1 <Kw>and</Kw> all(n % p <Kw>for</Kw> p <Kw>in</Kw> range(2, isqrt(n) + 1))</>,
      ]}
    />
  </Sketch>
)

export const PythonPandas = () => (
  <Sketch width={380} height={90}>
    <Code
      x={4}
      y={18}
      lines={[
        <>df = pd.read_parquet(<Str>"s3://lake/orders.parquet"</Str>)</>,
        <>(df.groupby(<Str>"region"</Str>)[<Str>"revenue"</Str>]</>,
        <>   .agg([<Str>"mean"</Str>, <Str>"std"</Str>])</>,
        <>   .sort_values(<Str>"mean"</Str>))</>,
      ]}
    />
  </Sketch>
)

export const PythonLorenz = () => (
  <Sketch width={340} height={90}>
    <Code
      x={4}
      y={18}
      lines={[
        <><Kw>def</Kw> lorenz(t, s, σ=10, ρ=28, β=8/3):</>,
        <>    x, y, z = s</>,
        <>    <Kw>return</Kw> [σ*(y-x), x*(ρ-z)-y, x*y-β*z]</>,
      ]}
    />
  </Sketch>
)

export const BigO = () => (
  <Sketch width={200} height={60}>
    <Hand x={4} y={38} size={30}>O(n log n)</Hand>
    <path d="M2 48 Q 80 58 170 46" className={styles.highlightStroke} />
  </Sketch>
)

