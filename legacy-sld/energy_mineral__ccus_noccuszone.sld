<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>energy_mineral:ccus_noccuszone</sld:Name>
        <sld:UserStyle>
            <sld:Name>energy_minerals_no_ccus_style</sld:Name>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>No-CCUS-Zone</sld:Name>
                    <sld:Title>Exclusion Zones - Land Management</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>No-CCUS-Zone</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:GraphicFill>
                                <sld:Graphic>
                                    <sld:Mark>
                                        <sld:WellKnownName>shape://slash</sld:WellKnownName>
                                        <sld:Stroke>
                                            <sld:CssParameter name="stroke">#ff0000</sld:CssParameter>
                                            <sld:CssParameter name="stroke-width">2</sld:CssParameter>
                                        </sld:Stroke>
                                    </sld:Mark>
                                    <sld:Size>8</sld:Size>
                                </sld:Graphic>
                            </sld:GraphicFill>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linecap">square</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>No-CCUS-Zone-Geo</sld:Name>
                    <sld:Title>Exclusion Zones - Geology</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>No-CCUS-Zone-Geo</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:GraphicFill>
                                <sld:Graphic>
                                    <sld:Mark>
                                        <sld:WellKnownName>shape://slash</sld:WellKnownName>
                                        <sld:Stroke>
                                            <sld:CssParameter name="stroke-width">2</sld:CssParameter>
                                        </sld:Stroke>
                                    </sld:Mark>
                                    <sld:Size>8</sld:Size>
                                </sld:Graphic>
                            </sld:GraphicFill>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linecap">square</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

