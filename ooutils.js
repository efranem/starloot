// Function that makes an inheritance
Object.prototype.inherits = function( parent )
{
	// Apply parent's constructor to this object
	if( arguments.length > 1 )
	{
		// Note: 'arguments' is an Object, not an Array
		parent.apply( this, Array.prototype.slice.call( arguments, 1 ) );
	}
	else
	{
		parent.call( this );
	}
}