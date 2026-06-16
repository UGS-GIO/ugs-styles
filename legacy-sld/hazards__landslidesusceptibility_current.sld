<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>hazards:landslidesusceptibility_current</sld:Name>
        <sld:UserStyle>
            <sld:Name>hazards_landslidesusceptibility_style</sld:Name>
            <sld:Title>Landslide Susceptibility</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>High_Susceptibility</sld:Name>
                    <sld:Title>High Susceptibility</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsshazardunit</ogc:PropertyName>
                            <ogc:Literal>Hlss</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#e60000</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#6e6e6e</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Moderate_Susceptibility</sld:Name>
                    <sld:Title>Moderate Susceptibility</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsshazardunit</ogc:PropertyName>
                            <ogc:Literal>Mlss</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#e69800</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#6e6e6e</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Low_Susceptibility</sld:Name>
                    <sld:Title>Low Susceptibility</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsshazardunit</ogc:PropertyName>
                            <ogc:Literal>Llss</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#98e600</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#6e6e6e</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

