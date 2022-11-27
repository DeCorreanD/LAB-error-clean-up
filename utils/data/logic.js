import { students, houses } from './studentArray';
import { studentsOnDom } from '../../components/shared/dombuilder';
import createId from '../../components/forms/newID';

// ********** LOGIC  ********** //
// sorts student to a house and then place them in the students array
const sortStudent = (e) => {
  e.preventDefault();
  const sortingHat = houses[Math.floor(Math.random() * houses.length)];

  if (e.target.id === 'sorting') {
    const student = document.querySelector('#student-name');

    // create the new student object
    students.push({
      id: createId(students),
      name: student.value,
      house: sortingHat.house,
      crest: sortingHat.crest,
    });

    student.value = ''; // reset value of input
    studentsOnDom('#students', students);
  }
};
export default sortStudent;
