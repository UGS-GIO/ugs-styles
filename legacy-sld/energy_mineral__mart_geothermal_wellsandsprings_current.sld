<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>energy_mineral:mart_geothermal_wellsandsprings_current</sld:Name>
        <sld:UserStyle>
            <sld:Name>energy_minerals_geothermal_wells_and_springs_style</sld:Name>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Mine</sld:Name>
                    <sld:Title>Mine</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>type</ogc:PropertyName>
                            <ogc:Literal>M</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#989898</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>7</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Spring</sld:Name>
                    <sld:Title>Spring</sld:Title>
                    <ogc:Filter>
                        <ogc:Or>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>type</ogc:PropertyName>
                                <ogc:Literal>S</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>type</ogc:PropertyName>
                                <ogc:Literal>S?</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:Or>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#32df36</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>7</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Well</sld:Name>
                    <sld:Title>Well</sld:Title>
                    <ogc:Filter>
                        <ogc:Or>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>type</ogc:PropertyName>
                                <ogc:Literal>W</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>type</ogc:PropertyName>
                                <ogc:Literal>W?</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:Or>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#1f78b4</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>7</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

