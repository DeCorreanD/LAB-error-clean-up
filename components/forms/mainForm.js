import renderToDOM from '../../utils/renderToDom';
import sortStudent from '../../utils/data/logic';
import { filterBtnRow, studentAreas, studentsOnDom } from '../shared/dombuilder';

import { students, voldysArmy } from '../../utils/data/studentArray';

// add form to DOM on start-sorting click.
// Add events for form after the form is on the DOM
const form = () => {
  const domString = `<form id="sorting" class="d-flex flex-column form-floating ">
    <input
    type="text"
    class="form-control mb-1"
    id="student-name"
    placeholder="Enter a name"
    required
  />
  <label for="floatingInputValue">Name to be sorted</label>
<button type="submit" class="btn btn-success">Get Sorted!</button>
</form>`;

  renderToDOM('#form-container', domString);

  // has to be put on the DOM after form is on DOM, not before
  // on form submit, sort student
  document.querySelector('#sorting').addEventListener('submit', sortStudent);
};

const events = () => {
  // get form on the DOM on button click
  document.querySelector('#start-sorting').addEventListener('click', () => {
    // put html elements on the DOM on click
    form(); // form
    filterBtnRow(); // filter buttons
    studentAreas(); // students and voldy's army divs
  });

  // target expel buttons to move to voldys army
  document.querySelector('#student-container').addEventListener('click', (e) => {
    if (e.target.id.includes('expel')) {
      const [, id] = e.target.id.split('--');
      const index = students.findIndex((student) => student.id === Number(id));

      // move from one array to another
      voldysArmy.push(...students.splice(index, 1));
      // get both sets of students on the DOM
      studentsOnDom('#students', students);
      studentsOnDom('#voldy', voldysArmy);
    }
  });

  // target filter buttons on Dom
  document.querySelector('#filter-container').addEventListener('click', (e) => {
    if (e.target.id.includes('filter')) {
      const [, house] = e.target.id.split('--');

      if (house === 'all') {
        studentsOnDom('#students', students);
      } else if (house) {
        const filter = students.filter((student) => student.house === house);
        studentsOnDom('#students', filter, house);
      }
    }
  });
};
export default events;
