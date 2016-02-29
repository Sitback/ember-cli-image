import Ember from 'ember';
import ImageStateMixin from './image-state-mixin';

/**
  @private
  Smallest possible image data uri. 1x1 px transparent gif.
  Used to cancel a image request in progress.
  */
const BLANK_IMG = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

/**
  Mixin to load images and handle state changes from
  native javascript image events.

  @class ImageLoaderMixin
  @uses Ember.Evented
  @uses ImageStateMixin
  @public
**/
export default Ember.Mixin.create(Ember.Evented, ImageStateMixin, {
  /**
    JavaScript Image Object used to do the loading.

    @property imageLoader
    @type Image
    @default Image
    @public
  */
  imageLoader: Ember.computed(function() {
    return new Image();
  }),

  /**
    Loads the image src using native javascript Image object
    @method loadImage
    @public
  */
  loadImage() {
    let url = this.get('url');
    let component = this;
    let img = null;

    if (url) {
      img = this.get('imageLoader');
      if (img) {
        this.trigger('willLoad', url);
        this.send('loadStatusChanged', { isLoading: true, isError: false });

        img.onload = function(e) {
          Ember.run(function() {
            component.send('loadStatusChanged', { isLoading: false, isError: false });
            component.trigger('didLoad', img, e);
          });
        };

        img.onerror = function(e) {
          Ember.run(function() {
            component.send('loadStatusChanged', { isLoading: false, isError: true });
            component.trigger('becameError', img, e);
          });
        };

        img.src = url;
      }
    }
  },

  /**
    Cancels a pending image request.
    @method cancelImageLoad
    @public
  */
  cancelImageLoad() {
    if (this.get('isLoading')) {
      this.setProperties({ isLoading: false, isError: false });
      this.clearImage();
    }
  },

  /**
   * @public
   * Clears an image to a blank state.
   * Useful for canceling, or when swapping urls
   * Notes:
   * - Removing img from the DOM does not cancel an img http request.
   * - Setting img src to null has unexpected results cross-browser.
   */
  clearImage() {
    let img = this.get('imageLoader');
    if (img) {
      img.onload = img.onerror = null;
      img.src = BLANK_IMG;
    }
  },

  /**
    Loads the image when the view is initially inserted
    @method loadImageOnInsert
    @public
  */
  loadImageOnInsert: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', this, this.loadImage);
  }),

  /**
    Load an image whenever the url is changed.
    @method loadImageOnUrlSet
    @public
  */
  loadImageOnUrlSet: Ember.observer('url', function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      this.clearImage();
      this.loadImage();
    });
  }),

  /**
    @private
    Remove image events when element is destroyed
    @method _teardownLoader
  */
  _teardownLoader: Ember.on('willDestroyElement', function() {
    let img = this.get('imageLoader');
    if (img) {
      img = img.onload = img.onerror = null;
      this.set('imageLoader', null);
    }
  }),

  /**
    @property actions
    @type Object
    @private
  */
  actions: {
    loadStatusChanged(props) {
      this.setProperties(props);

      // Bubble load status up to any parent components
      // (e.g. 'image-container').
      this.sendAction('action', props);
    }
  }
});
