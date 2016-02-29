import Ember from 'ember';
import layout from '../templates/components/image-container';
import ImageStateMixin from '../mixins/image-state-mixin';
// import StatefulImg from './stateful-img';
// import BackgroundImage from './background-image';

const { reads } = Ember.computed;

/**
  A container component with a stateful image as a child component.
  Class names are updated according to the image's state.

  Instances of `ImageContainer` can be created via:
  ```handlebars
  {{image-container src="img/image1.jpg" alt="Image" width=100 height=100}}
  ```

  @class ImageContainer
  @extends Ember.Component
  @uses ImageStateMixin
  @public
**/
export default Ember.Component.extend(ImageStateMixin, {
  layout,
  tagName: 'div',
  classNames: ['image-view'],
  loadingClass: 'image-loading',
  errorClass: 'image-error',
  childComponent: null,
  childComponentName: null,

  /**
    If `background` is true, the container uses a `BackgroundImageView`
    as its child image view instead of the default `ImgView`

    @property background
    @type Boolean
    @default false
    @public
  */
  background: false,

  /**
    The child image component which is either an `StatefulImg` or
    `BackgroundImage` based on the `background` property.

    @property imageView
    @type Ember.View
    @default Ember.ImgView
    @public
  */
  imageView: Ember.computed('background', function() {
    if (this.get('background')) {
      return 'background-image';
    }
    return 'stateful-img';
  }),

  /**
    @method _addImageViewChild
    @private
    Adds the sole child imageView
  */
  _addImageViewChild: Ember.on('init', function() {
    this.set('childComponent', this.get('imageView'));
  }),

  /**
    @method _onImageViewChanged
    @private
    Observes when the type of imageView is updated
    and recreates child views accordingly.
  */
  _onImageViewChanged: Ember.observer('imageView', function() {
    this._addImageViewChild();
  })
});
