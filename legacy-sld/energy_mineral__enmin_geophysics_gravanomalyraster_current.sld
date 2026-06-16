<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>energy_mineral:enmin_geophysics_gravanomalyraster_current</sld:Name>
        <sld:UserStyle>
            <sld:Name>energy_minerals_geophysics_gravanomolyraster_style</sld:Name>
            <sld:Title>Bouguer Gravity Anomaly - Blue to Yellow</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:RasterSymbolizer>
                        <sld:ChannelSelection>
                            <sld:GrayChannel>
                                <sld:SourceChannelName>1</sld:SourceChannelName>
                                <sld:ContrastEnhancement>
                                    <sld:GammaValue>1.0</sld:GammaValue>
                                </sld:ContrastEnhancement>
                            </sld:GrayChannel>
                        </sld:ChannelSelection>
                        <sld:ColorMap>
                            <sld:ColorMapEntry color="#440154" opacity="1" quantity="-310" label="Min"/>
                            <sld:ColorMapEntry color="#31688e" opacity="1" quantity="-246" label="Mean-1SD"/>
                            <sld:ColorMapEntry color="#35b779" opacity="1" quantity="-191" label="Mean"/>
                            <sld:ColorMapEntry color="#c8e020" opacity="1" quantity="-136" label="Mean+1SD"/>
                            <sld:ColorMapEntry color="#fde725" opacity="1" quantity="-81" label="Mean+2SD"/>
                            <sld:ColorMapEntry color="#000000" opacity="0" quantity="0" label="NoData"/>
                        </sld:ColorMap>
                        <sld:ContrastEnhancement/>
                    </sld:RasterSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

