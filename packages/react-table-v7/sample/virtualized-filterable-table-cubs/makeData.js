import fakePeople from 'fake-people';

export default function makeData(count) {
  const makeDataLevel = () => {
    const people = fakePeople
      .generate(count, [
        'firstName',
        'lastName',
        'contacts',
        'documents',
        'residency',
        'birthday',
        'bankAccount',
        'job',
        'adress',
      ])
      ?.map(({ adress, ...person }) => {
        const statusChance = Math.random();

        return {
          ...person,
          nickName: person.firstName,
          id: `row-${Math.random().toString(16).slice(2)}`,
          address: adress,
          age: Math.floor(Math.random() * 30),
          visits: Math.floor(Math.random() * 100),
          progress: Math.floor(Math.random() * 100),
          status:
            statusChance > 0.7
              ? 'relationship'
              : statusChance > 0.5
              ? 'divorced'
              : statusChance > 0.3
              ? 'complicated'
              : 'single',
        };
      });

    console.log(people);

    return people;
  };

  return makeDataLevel();
}
