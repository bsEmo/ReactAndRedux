import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState(event) {
    let course = this.state.course;
    course[event.target.name] = event.target.value;

    return this.setState({ course: course });
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving: true});

    this.props.saveCourse(this.state.course)
      .then(() => {
        this.setState({saving: false});
        toastr.success('Course Saved.');
        this.context.router.push('/courses');
      })
      .catch((error) => {
        this.setState({saving: false});
        toastr.error(error);
      });
  }

  render() {
    return (
      <CourseForm
        course={this.state.course}
        errors={this.state.errors}
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        saving={this.state.saving} />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  saveCourse: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id === id);

  if (course.length) {
    return course[0];
  } else {
    return null;
  }
}

function mapStateToProps(state, ownProps) {
  let courseId = ownProps.params.id;
  let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };

  if (courseId && state.courses.length) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForSelect = state.authors.map(author => {
    return {
      value: author.id,
      text: `${author.firstName} ${author.lastName}`
    };
  });

  return {
    course: course,
    authors: authorsFormattedForSelect
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(courseActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
