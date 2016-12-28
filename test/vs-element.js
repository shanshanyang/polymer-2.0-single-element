suite('<vs-element>', () => {

  test('instantiating the element works', function() {
    var element = fixture('basic');
    assert.equal(element.is, 'vs-element');
  });

  setup((done) => {
    // fixture setup code here
  });

  teardown(() => { 
    // 
  })
  // teardown


  /* Interaction Tests From "iron-test-helpers.html" */
  
  // test('can be triggered with space', function (done) {
  //   button.addEventListener('keydown', function () {
  //     done();
  //   });
  //   MockInteractions.pressSpace(button);
  // });

  // test('can be clicked', function (done) {
  //   button.addEventListener('click', function () {
  //     done();
  //   });
  //   MockInteractions.tap(button);
  // });

});