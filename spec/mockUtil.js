angular.module('mocks.util', [])
    .factory('mockUtil', mockUtil);

function mockUtil($q, $compile) {
    return {
        promise: plainPromise,
        setupSpies: setupSpies,
        createForm: createForm
    };

    function plainPromise(response) {
        return function promiseFn() {
            return $q.when(response || true);
        }
    }

    function resolveWith(obj, method, type, msg) {
        obj[method] = resolveFn;
        spyOn(obj, method).and.callThrough();

        function resolveFn() {
            return $q[type](msg);
        }
    }

    function setupSpies(obj) {
        Object.keys(obj).forEach(function (key) {
            spyOn(obj, key).and.callThrough();
            obj[key].rejectWith = resolveWith.bind(null, obj, key, 'reject');
            obj[key].resolveWith = resolveWith.bind(null, obj, key, 'when');
        });
    }

    function createForm(name, props, scope) {
        var formElem = angular.element('<form name="' + name + '" ></form>');
        props.forEach(function (prop) {
            var input = angular.element('<input />');
            prop.name && input.attr('name', prop.name);
            prop.modelProperty && input.attr('ng-model', prop.modelProperty);
            formElem.append(input);
        });
        $compile(formElem)(scope);
        return scope[name];
    }
}