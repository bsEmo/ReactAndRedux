import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

//Action Creator

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export const createCourseSuccess = (course) => ({
  type: types.CREATE_COURSE_SUCCESS,
  course
});

export const updateCourseSuccess = (course) => ({
  type: types.UPDATE_COURSE_SUCCESS,
  course
});

export const deleteCourseSuccess = (courseId) => ({
  type: types.DELETE_COURSE_SUCCESS,
  courseId
});

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw (error);
      });
  };
}

export function saveCourse(course) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course)
      .then(savedCourse => {
        course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        dispatch(ajaxCallError());
      });
  };
}

export function deleteCourse(courseId) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseApi.deleteCourse(courseId)
      .then(courseId => {
        dispatch(deleteCourseSuccess(courseId));
      })
      .catch(error => {
        throw (error);
      });
  };
}
