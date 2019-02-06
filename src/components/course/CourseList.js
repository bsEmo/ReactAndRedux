import React, { PropTypes } from 'react';
import CourseListRow from './CourseListRow';

const CourseList = ({ courses, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course =>
          <CourseListRow key={course.id} course={course} onDelete={onDelete} />
        )}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CourseList;
