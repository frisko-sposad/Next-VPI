export function Report({ data }) {
  const { player1, player2 } = data;
  console.log(player1);

  return (
    <>
      <Player front={player1.right} name="Player1-right" />
      <Player front={player1.left} name="Player1-left" />
      <Player front={player1.center} name="Player1-center" />
      <Player front={player1.defense} name="Player1-defense" />
    </>
  );
}

function Cell({ value }): JSX.Element {
  return <span className="px-1">{value}</span>;
}

function Player({ front, name }) {
  const frontReport = front.map((squad, index) => {
    return (
      <div key={`${index}-${squad.squadUnit.id}`}>
        <Cell value={squad.squadUnit.name} />
        <Cell value={squad.squadUnit.squadNumber} />
        <Cell value={squad.squadHero.heroName} />
      </div>
    );
  });

  return (
    <>
      <div>{name}</div>
      {frontReport}
    </>
  );
}
