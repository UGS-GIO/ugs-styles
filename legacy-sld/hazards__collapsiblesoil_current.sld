<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>hazards:collapsiblesoil_current</sld:Name>
        <sld:UserStyle>
            <sld:Name>hazards_collapsiblesoil_style</sld:Name>
            <sld:Title>Collapsible Soil Susceptibility</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Highly_Collapsible_Soils</sld:Name>
                    <sld:Title>Highly Collapsible Soils</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>csshazardunit</ogc:PropertyName>
                            <ogc:Literal>Hcss</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#e60000</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Collapsible_Soil_1</sld:Name>
                    <sld:Title>Collapsible Soil 1</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>csshazardunit</ogc:PropertyName>
                            <ogc:Literal>SU1css</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f2730e</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Collapsible_Soil_2</sld:Name>
                    <sld:Title>Collapsible Soil 2</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>csshazardunit</ogc:PropertyName>
                            <ogc:Literal>SU2css</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ffcc32</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Collapsible_Soil_3</sld:Name>
                    <sld:Title>Collapsible Soil 3</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>csshazardunit</ogc:PropertyName>
                            <ogc:Literal>SU3css</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#a83800</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Collapsible_Soil_4</sld:Name>
                    <sld:Title>Collapsible Soil 4</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>csshazardunit</ogc:PropertyName>
                            <ogc:Literal>SU4css</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ffe68c</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Bedrock</sld:Name>
                    <sld:Title>Bedrock</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>csshazardunit</ogc:PropertyName>
                            <ogc:Literal>Bedrock</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#b2b2b2</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

