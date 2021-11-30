// import { memo } from 'react';

// function Report({ data }) {
//   const { player1, player2 } = data;

//   return (
//     <>
//       <Player flank={player1.right} name="Player1-right" />
//       <Player flank={player1.left} name="Player1-left" />
//       <Player flank={player1.center} name="Player1-center" />
//       <Player flank={player1.defense} name="Player1-defense" />
//     </>
//   );
// }

// function Cell({ value }): JSX.Element {
//   return <span className="px-1">{value}</span>;
// }

// function Player({ flank, name }) {
//   const flankReport = flank.map((squad, index) => {
//     return (
//       <div key={`${index}-${squad.squadUnit.id}`}>
//         <Cell value={squad.squadUnit.name} />
//         <Cell value={squad.squadUnit.squadNumber} />
//         <Cell value={squad.squadHero.heroName} />
//       </div>
//     );
//   });

//   return (
//     <>
//       <div>{name}</div>
//       {flankReport}
//     </>
//   );
// }

// export default memo(Report);
