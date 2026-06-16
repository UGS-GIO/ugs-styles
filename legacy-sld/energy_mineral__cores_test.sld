<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>energy_mineral:cores_test</sld:Name>
        <sld:UserStyle>
            <sld:Name>point</sld:Name>
            <sld:Title>Red Square point</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:Abstract>A sample style that just prints out a red square</sld:Abstract>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Rule 1</sld:Name>
                    <sld:Title>Red Square point</sld:Title>
                    <sld:Abstract>A red fill with 6 pixels size</sld:Abstract>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#FF0000</sld:CssParameter>
                                </sld:Fill>
                            </sld:Mark>
                            <sld:Size>6</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

