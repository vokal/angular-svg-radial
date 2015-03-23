describe( "Angular SVG Radial", function ()
{
    var element, scope;
    var ae = angular.element;

    beforeEach( function ()
    {
        module( "svgRadial" );
        element = ae( "<asr-wrap percent='p'>Transclude This</asr-wrap>" );
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

        expect( element.children().length ).toBe( 2 ); // .asr-svg, [ ng-transclude ]

        // nested span inside the ng-transclude
        transclude = ae( element.children()[ 1 ] ).children( 0 );
        expect( ae( transclude ).text() ).toBe( "Transclude This" );
    } );

} );