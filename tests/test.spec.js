describe( "Angular SVG Radial", function ()
{
    var element, scope;
    var ae = angular.element;

    beforeEach( function ()
    {
        module( "svgRadial" );
        element = ae( "<radial-progress id='radial'>Transclude This</radial-progress>" );
        inject( function ( $rootScope, $compile )
        {
            scope = $rootScope.$new();
            $compile( element )( scope );
            scope.$digest();
        } );
    } );

    it( "should transclude content", function ()
    {
        var transclude;
        expect( element ).toBeTruthy();

        expect( element.children().length ).toBe( 3 ); // .base, .radial, ng-transclude

        // nested span inside the ng-transclude
        transclude = ae( element.children()[ 2 ] ).children( 0 );
        expect( ae( transclude ).text() ).toBe( "Transclude This" );
    } );

} );